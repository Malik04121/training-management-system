const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Course = require("../model/courseModel")


const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (role === "Admin" || role === "Trainer") {
            return res.status(400).json({ message: `${role} cannot create himself` });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {

        res.status(500).json({ error: err.message });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user._id, role: user.role, user: user }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        req.user = user
        res.status(200).json({ message: "Logged in successfully", user: { id: user._id, role: user.role, name: user.name, email: user.email } });
    } catch (err) {

        res.status(500).json({ error: err.message });
    }
};
const addTrainerByAdmin = async (req, res) => {
    try {
        const { name, email, password, trainerDescription, averagePricePerHour, trainerRating } = req.body;


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }
     

      

              const hashedPassword = await bcrypt.hash(ele.password, 10);
     
      
              const newTrainer = new User({
                  name,
                  email,
                  password: hashedPassword,
                  role: "Trainer",
                  trainerDescription,
                  averagePricePerHour,
                  trainerRating
              });
      
              await newTrainer.save();
          
          

        res.status(201).json({ message: "Trainer created successfully", trainer: { email, name, password, trainerDescription, averagePricePerHour, trainerRating } });
    } catch (err) {

        res.status(500).json({ error: err.message });
    }
};


const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getUserDetails = async (req, res) => {
    try {
        const userId = req.user.userId;

        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {

        res.status(500).json({ error: err.message });
    }
};


const getUsers = async (req, res) => {
    try {
        const { role } = req.query;
        const user = req.user


        if (!role) {
            return res.status(400).json({ message: "Role parameter is required" });
        }


        const users = await User.find({ role }).select('-password').populate("courses.courseId").populate("courses.trainerId"); 


        if (!users.length) {
            return res.status(404).json({ message: `No ${role}s found` });
        }

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const loginUserDetail = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).populate('courses.courseId').populate('courses.trainerId');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const filteredCourses = user.courses.filter(course => course.courseId !== null);

      
        const userWithFilteredCourses = {
            ...user.toObject(),
            courses: filteredCourses,
        };

        res.status(200).json({ message: 'Login User Detail Fetched Successfully', data: userWithFilteredCourses });
    } catch (error) {

        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Invalid token' });
        }
        return res.status(500).json({ error: 'Server error' });
    }

}

const verifyTokenAndRole = async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'Admin') {
            return res.status(403).json({ message: 'Access denied: Not an admin' });
        }


        res.status(200).json({ message: 'Admin access granted', data: decoded });
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};
const verifyToken=async(req,res)=>{
    const token=req.cookies.token
    console.log(token,"token")
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        res.status(200).json({ message: 'Token Validated', data: decoded });
    } catch (error) {
        console.log(error,"error")
        return res.status(403).json({ message: 'Invalid token' });
        
    }
}

const addCourseToUser = async (req, res) => {
    try {
        const userId = req.user.userId;
        // const userId = req.params.id;
        const { courseId, trainerId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        const existingCourse = user.courses.find(course => course.courseId.toString() === courseId);

        if (existingCourse) {
            return res.status(400).json({ message: "You had already enrolled in this course." });
        }

        user.courses.push({ courseId, trainerId });
        await user.save();
        await Course.findByIdAndUpdate(
            courseId,
            { $addToSet: { enrolled_people: userId } },
            { new: true }
        );
        res.status(200).json({ message: "Course and trainer added successfully", user });
    } catch (err) {

        if (err.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Invalid token' });
        }
        res.status(500).json({ error: err.message });
    
    }
};

module.exports = {
    registerUser,
    loginUser,
    addTrainerByAdmin,
    logoutUser,
    getUserDetails,
    getUsers,
    verifyTokenAndRole,
    addCourseToUser,
    loginUserDetail,
    verifyToken
};