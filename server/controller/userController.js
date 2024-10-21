const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Course = require("../model/courseModel")

// User registration
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
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

// User login
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
        console.log(err, "err");
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
      const dummyTrainer=  [
            {
              "name": "Alice Johnson",
              "email": "alice.johnson@example.com",
              "password": "securePassword123",
              "description": "Experienced full stack developer specializing in JavaScript frameworks and cloud architecture. Passionate about teaching coding skills.",
              "averagePricePerHour": 150,
              "trainerRating": 4.8
            },
            {
              "name": "Michael Smith",
              "email": "michael.smith@example.com",
              "password": "password456",
              "description": "Skilled in Python and Java, I guide students to build robust applications while mastering essential coding principles.",
              "averagePricePerHour": 120,
              "trainerRating": 4.7
            },
            {
              "name": "Sofia Lee",
              "email": "sofia.lee@example.com",
              "password": "myPassword789",
              "description": "Creative designer with expertise in UX/UI, dedicated to teaching design thinking and digital strategies for aspiring developers.",
              "averagePricePerHour": 130,
              "trainerRating": 4.9
            },
            {
              "name": "David Brown",
              "email": "david.brown@example.com",
              "password": "password321",
              "description": "Cloud computing expert with extensive experience in AWS and Azure. I help students navigate real-world projects effectively.",
              "averagePricePerHour": 140,
              "trainerRating": 4.6
            },
            {
              "name": "Emma Wilson",
              "email": "emma.wilson@example.com",
              "password": "secure12345",
              "description": "Full stack engineer focused on modern web technologies. I empower learners through hands-on coding exercises and personalized mentorship.",
              "averagePricePerHour": 160,
              "trainerRating": 4.5
            },
            {
              "name": "James Taylor",
              "email": "james.taylor@example.com",
              "password": "jamesPassword987",
              "description": "Passionate about teaching React and Node.js, I help students develop full stack applications with industry best practices.",
              "averagePricePerHour": 155,
              "trainerRating": 4.7
            },
            {
              "name": "Natalie Green",
              "email": "natalie.green@example.com",
              "password": "natalie123",
              "description": "Expert in graphic design and branding, I guide aspiring designers to create impactful visuals and cohesive brand identities.",
              "averagePricePerHour": 140,
              "trainerRating": 4.8
            },
            {
              "name": "Oliver Martinez",
              "email": "oliver.martinez@example.com",
              "password": "oliver456",
              "description": "Full stack developer with a focus on Python and Django. I help students build scalable applications through hands-on projects.",
              "averagePricePerHour": 125,
              "trainerRating": 4.6
            },
            {
              "name": "Lily Rodriguez",
              "email": "lily.rodriguez@example.com",
              "password": "lilyPassword321",
              "description": "Cloud solutions architect with experience in Google Cloud Platform. I teach students how to leverage cloud technologies effectively.",
              "averagePricePerHour": 135,
              "trainerRating": 4.7
            },
            {
              "name": "Ethan White",
              "email": "ethan.white@example.com",
              "password": "ethanPass123",
              "description": "Mobile app developer proficient in Flutter and React Native, focusing on creating engaging applications for both iOS and Android.",
              "averagePricePerHour": 145,
              "trainerRating": 4.8
            },
            {
              "name": "Chloe Hall",
              "email": "chloe.hall@example.com",
              "password": "chloeHall456",
              "description": "Frontend developer with a passion for HTML, CSS, and JavaScript. I aim to inspire students to create beautiful, responsive designs.",
              "averagePricePerHour": 115,
              "trainerRating": 4.9
            }
          ]

          dummyTrainer.map(async(ele)=>{

              const hashedPassword = await bcrypt.hash(ele.password, 10);
      const name=ele.name
      const email=ele.email
      const trainerDescription=ele.description
      const averagePricePerHour=ele.averagePricePerHour
      const trainerRating=ele.trainerRating
      
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
          })
          

        res.status(201).json({ message: "Trainer created successfully", trainer: { email, name, password, trainerDescription, averagePricePerHour, trainerRating } });
    } catch (err) {
        console.log(err);
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
        console.log(userId, "userId")
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        console.log(err, "err")
        res.status(500).json({ error: err.message });
    }
};

// Get users based on role (user or trainer)
const getUsers = async (req, res) => {
    try {
        const { role } = req.query;
        const user = req.user
        console.log(user, "user detail ")

        if (!role) {
            return res.status(400).json({ message: "Role parameter is required" });
        }

        // Find users based on role
        const users = await User.find({ role }).select('-password');  // Exclude password from the results

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
        res.status(200).json({ message: 'Login User Detail Fetched Successfully', data: user });
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

const addCourseToUser = async (req, res) => {
    try {
        const userId = req.user.userId;
        // const userId = req.params.id;
        const { courseId, trainerId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(user, "user list ")

        const existingCourse = user.courses.find(course => course.courseId.toString() === courseId);
        console.log(existingCourse, "existingCourse")
        if (existingCourse) {
            return res.status(400).json({ message: "You had already enrolled in this course." });
        }

        user.courses.push({ courseId, trainerId });
        await user.save();
        await Course.findByIdAndUpdate(
            courseId,
            { $addToSet: { enrolledPeople: userId } },
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
    loginUserDetail
};