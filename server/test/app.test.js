const mongoose = require("mongoose");
const request = require("supertest");
const { app } = require("../app");
const Category = require("../model/categoryModel");
const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CourseModule = require("../model/courseModuleModel");
const Course = require("../model/courseModel");
const cloudinary = require("cloudinary")

require("dotenv").config();

let server;
let adminToken;
let userToken;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL_TEST);

  adminToken = jwt.sign({ userId: "adminUserId", role: "Admin" }, process.env.JWT_SECRET, { expiresIn: '1d' });
  userToken = jwt.sign({ userId: "regularUserId", role: "User" }, process.env.JWT_SECRET, { expiresIn: '1d' });
});

afterAll(async () => {
  await mongoose.connection.close();
 
});

afterEach(async () => {

  await Category.deleteMany();
  await CourseModule.deleteMany();
  await Course.deleteMany();
  await User.deleteMany();
});

describe("Category API Tests", () => {
  describe("get category list", () => {
    it("should return categories", async () => {
      const category = await Category.create({ name: "Test Category" });

      const res = await request(app).get("/api/category/");
      const body = res.body;

      expect(res.statusCode).toBe(200);
      expect(body).toBeInstanceOf(Array);
      expect(body.length).toBeGreaterThan(0);
      expect(body[body.length - 1]).toHaveProperty("name", "Test Category");

      categoryId = body[body.length - 1]._id;
    });

    it("should handle server error", async () => {
      jest.spyOn(Category, 'find').mockImplementation(() => {
        throw new Error("Server error");
      });
      const res = await request(app).get("/api/category/");

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty("error", "Server error");

      Category.find.mockRestore();
    });
  });

  describe("add category", () => {
    it("should add a new category by admin", async () => {
      const res = await request(app)
        .post("/api/category/")
        .set("Cookie", `token=${adminToken}`)
        .send({ name: "New Category" });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("name", "New Category");

      const categoryInDb = await Category.findOne({ name: "New Category" });
      expect(categoryInDb).not.toBeNull();
    });
    it("should not allow a regular user to add a category", async () => {
      const res = await request(app)
        .post("/api/category/")
        .set("Cookie", `token=${userToken}`)
        .send({ name: "New Category" });

      expect(res.statusCode).toBe(403);
      expect(res.body).toHaveProperty("message", "Access denied. Admins only.");
    });

    it("should handle server error", async () => {
      jest.spyOn(Category.prototype, 'save').mockImplementation(() => {
        throw new Error("Server error");
      });

      const res = await request(app)
        .post("/api/category/")
        .set("Cookie", `token=${adminToken}`)
        .send({ name: "New Category" });

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty("error", "Server error");

      Category.prototype.save.mockRestore(); 
    });
  });

  describe("Delete category", () => {
    it("should delete a category by admin", async () => {
      const category = await Category.create({ name: "Category to Delete" });
      const res = await request(app)
        .delete(`/api/category/${category._id}`)
        .set("Cookie", `token=${adminToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "Category Deleted Successfully");

      const categoryInDb = await Category.findById(category._id);
      expect(categoryInDb).toBeNull();
    });

    it("should not allow a regular user to delete a category", async () => {
      const category = await Category.create({ name: "Category to Delete" });
      const res = await request(app)
        .delete(`/api/category/${category._id}`)
        .set("Cookie", `token=${userToken}`);

      expect(res.statusCode).toBe(403);
      expect(res.body).toHaveProperty("message", "Access denied. Admins only.");
    });

    it("should return 404 if category not found", async () => {
      const invalidCategoryId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .delete(`/api/category/${invalidCategoryId}`)
        .set("Cookie", `token=${adminToken}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message", "Category not found");
    });

    it("should handle server error", async () => {
      jest.spyOn(Category, 'findByIdAndDelete').mockImplementation(() => {
        throw new Error("Server error");
      });
      const category = await Category.create({ name: "Category to Delete" });
      const res = await request(app)
        .delete(`/api/category/${category._id}`)
        .set("Cookie", `token=${adminToken}`);

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty("error", "Server error");

      Category.findByIdAndDelete.mockRestore(); 
    });
  });
});

describe("User API Tests", () => {
  let userId;
  let userToken;

  describe("User Registration and Update", () => {
    it("should register a new user successfully", async () => {
      const res = await request(app)
        .post("/api/users/signup")
        .send({
          name: "Test User",
          email: "testuser@example.com",
          password: "password123",
          role: "User",
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("message", "User created successfully");

      const userInDb = await User.findOne({ email: "testuser@example.com" });
      expect(userInDb).not.toBeNull();
      expect(userInDb.name).toBe("Test User");

      userId = userInDb._id;
    });

    it("should not allow registration of a user with an existing email", async () => {
      await User.create({
        name: "Existing User",
        email: "existinguser@example.com",
        password: "password123",
        role: "User",
      });

      const res = await request(app)
        .post("/api/users/signup")
        .send({
          name: "Another User",
          email: "existinguser@example.com",
          password: "password456",
          role: "User",
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message", "User already exists");
    });
  });

  describe("User Login", () => {
    beforeEach(async () => {
      const hashedPassword = await bcrypt.hash("password123", 10);
      const user = await User.create({
        name: "Test User",
        email: "testuser@example.com",
        password: hashedPassword,
        role: "User",
      });

      userId = user._id;
      userToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    });

    it("should login a user successfully", async () => {
      const res = await request(app)
        .post("/api/users/login")
        .send({
          email: "testuser@example.com",
          password: "password123",
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "Logged in successfully");
      expect(res.body.user).toHaveProperty("id", userId.toString());
      expect(res.body.user).toHaveProperty("role", "User");
      expect(res.body.user).toHaveProperty("name", "Test User");
      expect(res.body.user).toHaveProperty("email", "testuser@example.com");
      expect(res.headers['set-cookie']).toBeDefined();
    });

    it("should not login a user with incorrect email", async () => {
      const res = await request(app)
        .post("/api/users/login")
        .send({
          email: "wrongemail@example.com",
          password: "password123",
        });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("message", "Invalid email or password");
    });

    it("should not login a user with incorrect password", async () => {
      const res = await request(app)
        .post("/api/users/login")
        .send({
          email: "testuser@example.com",
          password: "wrongpassword",
        });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("message", "Invalid email or password");
    });
  });

  describe("User Logout", () => {
    beforeEach(async () => {
      const hashedPassword = await bcrypt.hash("password123", 10);
      const user = await User.create({
        name: "Test User",
        email: "testuser@example.com",
        password: hashedPassword,
        role: "User",
      });

      userId = user._id;
      userToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    });

    it("should logout a user successfully", async () => {
      const res = await request(app)
        .get("/api/users/logout")
        .set("Cookie", `token=${userToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "Logged out successfully");
      expect(res.headers['set-cookie']).toBeDefined();
    });

    it("should handle logout without a token", async () => {
      const res = await request(app)
        .get("/api/users/logout");

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "Logged out successfully");
    });

    it("should handle server error during logout", async () => {
      const originalClearCookie = app.response.clearCookie;
      app.response.clearCookie = jest.fn(() => {
        throw new Error("Server error");
      });

      const res = await request(app)
        .get("/api/users/logout")
        .set("Cookie", `token=${userToken}`);

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty("error", "Server error");

      app.response.clearCookie = originalClearCookie;
    });
  });

  describe("Add Trainer by Admin", () => {
    let adminToken;

    beforeEach(async () => {
      const hashedPassword = await bcrypt.hash("adminpassword", 10);
      const admin = await User.create({
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
        role: "Admin",
      });

      adminToken = jwt.sign({ userId: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    });

    it("should allow admin to add a trainer", async () => {
      const res = await request(app)
        .post("/api/users/addTrainer")
        .set("Cookie", `token=${adminToken}`)
        .send({
          name: "Trainer User",
          email: "trainer@example.com",
          password: "trainerpassword",
          trainerDescription: "Experienced trainer",
          averagePricePerHour: 50,
          trainerRating: 4.5,
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("message", "Trainer created successfully");
      expect(res.body.trainer).toHaveProperty("email", "trainer@example.com");
      expect(res.body.trainer).toHaveProperty("name", "Trainer User");
      expect(res.body.trainer).toHaveProperty("trainerDescription", "Experienced trainer");
      expect(res.body.trainer).toHaveProperty("averagePricePerHour", 50);
      expect(res.body.trainer).toHaveProperty("trainerRating", 4.5);

      const trainerInDb = await User.findOne({ email: "trainer@example.com" });
      expect(trainerInDb).not.toBeNull();
      expect(trainerInDb.role).toBe("Trainer");
    });

    it("should not allow non-admin to add a trainer", async () => {
      const hashedPassword = await bcrypt.hash("userpassword", 10);
      const user = await User.create({
        name: "Regular User",
        email: "user@example.com",
        password: hashedPassword,
        role: "User",
      });

      const userToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

      const res = await request(app)
        .post("/api/users/addTrainer")
        .set("Cookie", `token=${userToken}`)
        .send({
          name: "Trainer User",
          email: "trainer@example.com",
          password: "trainerpassword",
          trainerDescription: "Experienced trainer",
          averagePricePerHour: 50,
          trainerRating: 4.5,
        });

      expect(res.statusCode).toBe(403);
      expect(res.body).toHaveProperty("message", "Access denied. Admins only.");
    });

    it("should not allow adding a trainer with an existing email", async () => {
      const hashedPassword = await bcrypt.hash("trainerpassword", 10);
      await User.create({
        name: "Existing Trainer",
        email: "trainer@example.com",
        password: hashedPassword,
        role: "Trainer",
        trainerDescription: "Experienced trainer",
        averagePricePerHour: 50,
        trainerRating: 4.5,
      });

      const res = await request(app)
        .post("/api/users/addTrainer")
        .set("Cookie", `token=${adminToken}`)
        .send({
          name: "New Trainer",
          email: "trainer@example.com", 
          password: "newtrainerpassword",
          trainerDescription: "New trainer",
          averagePricePerHour: 60,
          trainerRating: 4.0,
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message", "User with this email already exists");
    });

    it("should return 401 if no token is provided", async () => {
      const res = await request(app)
        .post("/api/users/addTrainer")
        .send({
          name: "Trainer User",
          email: "trainer@example.com",
          password: "trainerpassword",
          trainerDescription: "Experienced trainer",
          averagePricePerHour: 50,
          trainerRating: 4.5,
        });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("message", "No authentication token, access denied");
    });
  });

  describe("Get Users by Role", () => {
    let adminToken;

    beforeEach(async () => {
      const hashedPassword = await bcrypt.hash("adminpassword", 10);
      const admin = await User.create({
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
        role: "Admin",
      });

      adminToken = jwt.sign({ userId: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    });
    it("should get users by role successfully", async () => {
      await User.create({
        name: "Trainer User",
        email: "trainer@example.com",
        password: await bcrypt.hash("trainerpassword", 10),
        role: "Trainer",
      });
  
      const res = await request(app)
        .get("/api/users")
        .set("Cookie", `token=${adminToken}`)
        .query({ role: "Trainer", page: 1, limit: 10 });
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toBeInstanceOf(Array);
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(res.body.data[0]).toHaveProperty("email", "trainer@example.com");
      expect(res.body.data[0]).toHaveProperty("name", "Trainer User");
      expect(res.body.data[0]).toHaveProperty("role", "Trainer");
      expect(res.body.data[0]).not.toHaveProperty("password");
      expect(res.body).toHaveProperty("currentPage", 1);
      expect(res.body).toHaveProperty("totalPages");
      expect(res.body).toHaveProperty("totalUsers");
    });

    it("should return 400 if role parameter is missing", async () => {
      const res = await request(app)
        .get("/api/users")
        .set("Cookie", `token=${adminToken}`);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message", "Role parameter is required");
    });

    it("should return 404 if no users found for the given role", async () => {
      const res = await request(app)
        .get("/api/users")
        .set("Cookie", `token=${adminToken}`)
        .query({ role: "NonExistentRole" });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message", "No NonExistentRoles found");
    });

    it("should return 500 if there is a server error", async () => {
      jest.spyOn(User, 'find').mockImplementation(() => {
        throw new Error("Server error");
      });

      const res = await request(app)
        .get("/api/users")
        .set("Cookie", `token=${adminToken}`)
        .query({ role: "Trainer" });

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty("error", "Server error");

      User.find.mockRestore(); 
    });
  });

  describe("Login User Detail", () => {
    beforeEach(async () => {
      const hashedPassword = await bcrypt.hash("password123", 10);
      const user = await User.create({
        name: "Test User",
        email: "testuser@example.com",
        password: hashedPassword,
        role: "User",
      });

      userId = user._id;
      userToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    });

    it("should fetch user details successfully", async () => {
      const res = await request(app)
        .get("/api/users/loginUserData")
        .set("Cookie", `token=${userToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "Login User Detail Fetched Successfully");
      expect(res.body.data).toHaveProperty("email", "testuser@example.com");
      expect(res.body.data).toHaveProperty("name", "Test User");
    });

    it("should return 401 if no token is provided", async () => {
      const res = await request(app)
        .get("/api/users/loginUserData");

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("message", "No token provided");
    });

    it("should return 403 if token is invalid", async () => {
      const res = await request(app)
        .get("/api/users/loginUserData")
        .set("Cookie", `token=invalidtoken`);

      expect(res.statusCode).toBe(403);
      expect(res.body).toHaveProperty("message", "Invalid token");
    });

    it("should return 404 if user is not found", async () => {
      const invalidToken = jwt.sign({ userId: new mongoose.Types.ObjectId(), role: "User" }, process.env.JWT_SECRET, { expiresIn: '1d' });

      const res = await request(app)
        .get("/api/users/loginUserData")
        .set("Cookie", `token=${invalidToken}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message", "User not found");
    });
    it("should return 500 if there is a server error", async () => {
      jest.spyOn(User, 'findById').mockImplementation(() => {
        throw new Error("Server error");
      });

      const res = await request(app)
        .get("/api/users/loginUserData")
        .set("Cookie", `token=${userToken}`);

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty("error", "Server error");

      User.findById.mockRestore(); 
    });
  });

  describe("Add Course to User", () => {
    beforeEach(async () => {
      const hashedPassword = await bcrypt.hash("password123", 10);
      const user = await User.create({
        name: "Test User",
        email: "testuser@example.com",
        password: hashedPassword,
        role: "User",
        courses: [],
      });
  
      userId = user._id;
      userToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  
      const course = await Course.create({
        name: "Test Course",
        description: "Test Course Description",
        courseStartDate: new Date(), 
        enrolled_people: [],
      });
  
      courseId = course._id;
  
      const trainer = await User.create({
        name: "Test Trainer",
        email: "testtrainer@example.com",
        password: await bcrypt.hash("password123", 10),
        role: "Trainer",
      });
  
      trainerId = trainer._id;
    });
  
    it("should add a course to the user successfully", async () => {
      const res = await request(app)
        .patch(`/api/users/${userId}/courses`)
        .set("Cookie", `token=${userToken}`)
        .send({ courseId, trainerId });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("message", "Course and trainer added successfully");
        expect(res.body.user.courses).toBeInstanceOf(Array);
        expect(res.body.user.courses.length).toBe(1);
        expect(res.body.user.courses[0]).toHaveProperty("courseId", courseId.toString());
        expect(res.body.user.courses[0]).toHaveProperty("trainerId", trainerId.toString());
      });
    
      it("should return 401 if no token is provided", async () => {
        const res = await request(app)
          .patch(`/api/users/${userId}/courses`)
          .send({ courseId, trainerId });
    
        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty("message", "No authentication token, access denied");
      });
    
      it("should return 403 if token is invalid", async () => {
        const res = await request(app)
          .patch(`/api/users/${userId}/courses`)
          .set("Cookie", `token=invalidtoken`)
          .send({ courseId, trainerId });
    
        expect(res.statusCode).toBe(403);
        expect(res.body).toHaveProperty("message", "Invalid token");
      });
    
      it("should return 400 if user is already enrolled in the course", async () => {
        await User.findByIdAndUpdate(userId, { $push: { courses: { courseId, trainerId } } });
    
        const res = await request(app)
          .patch(`/api/users/${userId}/courses`)
          .set("Cookie", `token=${userToken}`)
          .send({ courseId, trainerId });
          expect(res.statusCode).toBe(400);
          expect(res.body).toHaveProperty("message", "You had already enrolled in this course.");
        });
      
        it("should return 500 if there is a server error", async () => {
          jest.spyOn(User.prototype, 'save').mockImplementation(() => {
            throw new Error("Server error");
          });
      
          const res = await request(app)
            .patch(`/api/users/${userId}/courses`)
            .set("Cookie", `token=${userToken}`)
            .send({ courseId, trainerId });
      
          expect(res.statusCode).toBe(500);
          expect(res.body).toHaveProperty("error", "Server error");
      
          User.prototype.save.mockRestore(); 
        });
      });


  describe("Verify Token and Role", () => {
    beforeEach(async () => {
      const admin = await User.create({
        name: "Admin User",
        email: "admin@example.com",
        password: "password123",
        role: "Admin",
      });
    
      adminToken = jwt.sign({ userId: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
      const user = await User.create({
        name: "Regular User",
        email: "user@example.com",
        password: "password123",
        role: "User",
      });
      userToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    })

    it("should grant admin access if token is valid and user is an admin", async () => {
      const res = await request(app)
        .get("/api/users/verify")
        .set("Cookie", `token=${adminToken}`);
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "Admin access granted");
      expect(res.body.data).toHaveProperty("role", "Admin");
    });
  
    it("should return 401 if no token is provided", async () => {
      const res = await request(app)
        .get("/api/users/verify");
  
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("message", "No token provided");
    });
  
    it("should return 403 if token is invalid", async () => {
      const res = await request(app)
        .get("/api/users/verify")
        .set("Cookie", `token=invalidtoken`);
  
      expect(res.statusCode).toBe(403);
      expect(res.body).toHaveProperty("message", "Invalid token");
    });
  
    it("should return 403 if user is not an admin", async () => {
      const res = await request(app)
        .get("/api/users/verify")
        .set("Cookie", `token=${userToken}`);
  
      expect(res.statusCode).toBe(403);
      expect(res.body).toHaveProperty("message", "Access denied: Not an admin");
    });
  });
  
});

describe("Course Module API Tests", () => {
  describe("Get course module", () => {
    it("should return modules", async () => {
      const category = await Category.create({ name: "Test Category" });
      const module = await CourseModule.create({
        name: "Test Module",
        description: "Module Description",
        moduleNumber: 1,
        moduleDuration: 2,
        moduleContent: [{ name: "Content 1", duration: 1 }],
        category: category._id
      });

      const res = await request(app).get("/api/module/");
      const body = res.body;

      expect(res.statusCode).toBe(200);
      expect(body).toBeInstanceOf(Array);
      expect(body.length).toBeGreaterThan(0);
      expect(body[body.length - 1]).toHaveProperty("name", "Test Module");
      expect(body[body.length - 1].category).toHaveProperty("name", "Test Category");
    });

    it("should handle server error", async () => {
      jest.spyOn(CourseModule, 'find').mockImplementation(() => {
        throw new Error("Server error");
      });

      const res = await request(app).get("/api/module/");

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty("error", "Server error");

      CourseModule.find.mockRestore(); 
    });
  });

  describe("Add Module", () => {
    it("should add a new module by admin", async () => {
      const category = await Category.create({ name: "Test Category" });

      const res = await request(app)
        .post("/api/module/addModule")
        .set("Cookie", `token=${adminToken}`)
        .send({
          name: "New Module",
          description: "Module Description",
          moduleNumber: 1,
          moduleDuration: 2,
          moduleContent: [{ name: "Content 1", duration: 1 }],
          category: category._id
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("name", "New Module");

      const moduleInDb = await CourseModule.findOne({ name: "New Module" });
      expect(moduleInDb).not.toBeNull();
    });

    it("should not allow a regular user to add a module", async () => {
      const category = await Category.create({ name: "Test Category" });

      const res = await request(app)
        .post("/api/module/addModule")
        .set("Cookie", `token=${userToken}`)
        .send({
          name: "New Module",
          description: "Module Description",
          moduleNumber: 1,
          moduleDuration: 2,
          moduleContent: [{ name: "Content 1", duration: 1 }],
          category: category._id
        });

      expect(res.statusCode).toBe(403);
      expect(res.body).toHaveProperty("message", "Access denied. Admins only.");
    });

    it("should not add a module if it already exists", async () => {
      const category = await Category.create({ name: "Test Category" });
      await CourseModule.create({
        name: "Existing Module",
        description: "Module Description",
        moduleNumber: 1,
        moduleDuration: 2,
        moduleContent: [{ name: "Content 1", duration: 1 }],
        category: category._id
      });

      const res = await request(app)
        .post("/api/module/addModule")
        .set("Cookie", `token=${adminToken}`)
        .send({
          name: "Existing Module",
          description: "Module Description",
          moduleNumber: 1,
          moduleDuration: 2,
          moduleContent: [{ name: "Content 1", duration: 1 }],
          category: category._id
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message", "Module already exists");
    });

    it("should handle server error", async () => {
      jest.spyOn(CourseModule.prototype, 'save').mockImplementation(() => {
        throw new Error("Server error");
      });

      const category = await Category.create({ name: "Test Category" });

      const res = await request(app)
        .post("/api/module/addModule")
        .set("Cookie", `token=${adminToken}`)
        .send({
          name: "New Module",
          description: "Module Description",
          moduleNumber: 1,
          moduleDuration: 2,
          moduleContent: [{ name: "Content 1", duration: 1 }],
          category: category._id
        });

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty("error", "Server error");

      CourseModule.prototype.save.mockRestore(); 
    });
  });

  describe("Delete module", () => {
    it("should delete a module by admin", async () => {
      const module = await CourseModule.create({
        name: "Module to Delete",
        description: "Module Description",
        moduleNumber: 1,
        moduleDuration: 2,
        moduleContent: [{ name: "Content 1", duration: 1 }],
        category: new mongoose.Types.ObjectId()
      });
      const res = await request(app)
        .delete(`/api/module/${module._id}`)
        .set("Cookie", `token=${adminToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "Module Deleted Successfully");

      const moduleInDb = await CourseModule.findById(module._id);
      expect(moduleInDb).toBeNull();
    });

    it("should not allow a regular user to delete a module", async () => {
      const module = await CourseModule.create({
        name: "Module to Delete",
        description: "Module Description",
        moduleNumber: 1,
        moduleDuration: 2,
        moduleContent: [{ name: "Content 1", duration: 1 }],
        category: new mongoose.Types.ObjectId()
      });
      const res = await request(app)
        .delete(`/api/module/${module._id}`)
        .set("Cookie", `token=${userToken}`);

      expect(res.statusCode).toBe(403);
      expect(res.body).toHaveProperty("message", "Access denied. Admins only.");
    });

    it("should return 404 if module not found", async () => {
      const invalidModuleId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .delete(`/api/module/${invalidModuleId}`)
        .set("Cookie", `token=${adminToken}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message", "Module not found");
    });

    it("should handle server error", async () => {
      jest.spyOn(CourseModule, 'findByIdAndDelete').mockImplementation(() => {
        throw new Error("Server error");
      });

      const module = await CourseModule.create({
        name: "Module to Delete",
        description: "Module Description",
        moduleNumber: 1,
        moduleDuration: 2,
        moduleContent: [{ name: "Content 1", duration: 1 }],
        category: new mongoose.Types.ObjectId()
      });
      const res = await request(app)
        .delete(`/api/module/${module._id}`)
        .set("Cookie", `token=${adminToken}`);

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty("error", "Server error");

      CourseModule.findByIdAndDelete.mockRestore(); 
    });
  });
});

describe("Course API Tests", () => {
  describe("Get All Courses Successfully", () => {
    it("should return courses", async () => {
      const category = await Category.create({ name: "Test Category" });
      const module = await CourseModule.create({
        name: "Test Module",
        description: "Module Description",
        moduleNumber: 1,
        moduleDuration: 2,
        moduleContent: [{ name: "Content 1", duration: 1 }],
        category: category._id
      });
      const course = await Course.create({
        name: "Test Course",
        description: "Course Description",
        duration: 10,
        rating: 4.5,
        trainers: [],
        category: category._id,
        modules: [module._id]
      });

      const res = await request(app).get("/api/course");
      const body = res.body;

      expect(res.statusCode).toBe(200);
      expect(body).toBeInstanceOf(Array);
      expect(body.length).toBeGreaterThan(0);
      expect(body[body.length - 1]).toHaveProperty("name", "Test Course");
      expect(body[body.length - 1].category).toHaveProperty("name", "Test Category");
      expect(body[body.length - 1].modules[0]).toHaveProperty("name", "Test Module");
    });

    it("should handle server error", async () => {
      jest.spyOn(Course, 'find').mockImplementation(() => {
        throw new Error("Server error");
      });

      const res = await request(app).get("/api/course");

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty("error", "Server error");

      Course.find.mockRestore(); 
    });
  });

  describe("Get Perticular Course by id", () => {
    it("should return an individual course", async () => {
      const category = await Category.create({ name: "Test Category" });
      const module = await CourseModule.create({
        name: "Test Module",
        description: "Module Description",
        moduleNumber: 1,
        moduleDuration: 2,
        moduleContent: [{ name: "Content 1", duration: 1 }],
        category: category._id
      });
      const course = await Course.create({
        name: "Test Course",
        description: "Course Description",
        duration: 10,
        rating: 4.5,
        trainers: [],
        category: category._id,
        modules: [module._id]
      });

      const res = await request(app)
        .get(`/api/course/${course._id}`)
        .set("Cookie", `token=${userToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("name", "Test Course");
      expect(res.body.category).toHaveProperty("name", "Test Category");
      expect(res.body.modules[0]).toHaveProperty("name", "Test Module");
    });

    it("should return 404 if course not found", async () => {
      const invalidCourseId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .get(`/api/course/${invalidCourseId}`)
        .set("Cookie", `token=${userToken}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message", "Course not found");
    });

    it("should handle server error", async () => {
      jest.spyOn(Course, 'findById').mockImplementation(() => {
        throw new Error("Server error");
      });

      const res = await request(app)
        .get(`/api/course/${new mongoose.Types.ObjectId()}`)
        .set("Cookie", `token=${userToken}`);

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty("error", "Server error");

      Course.findById.mockRestore(); 
    });
  });

  describe("add new course ", () => {
    beforeEach(async () => {
      jest.spyOn(cloudinary.uploader, 'upload').mockImplementation((path, options) => {
        return Promise.resolve({ secure_url: "http://example.com/banner.jpg" });
      });
    });

    it("should add a new course by admin", async () => {
      const category = await Category.create({ name: "Test Category" });
      const module = await CourseModule.create({
        name: "Test Module",
        description: "Module Description",
        moduleNumber: 1,
        moduleDuration: 2,
        moduleContent: [{ name: "Content 1", duration: 1 }],
        category: category._id
      });

      const res = await request(app)
        .post("/api/course/addCourse")
        .set("Cookie", `token=${adminToken}`)
        .field("name", "New Course")
        .field("description", "Course Description")
        .field("duration", 10)
        .field("rating", 4.5)
        .field("category", category._id.toString())
        .field("modules", module._id.toString())
        .attach("banner", Buffer.from("test"), "banner.jpg");

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("name", "New Course");
      expect(res.body).toHaveProperty("bannerUrl", "http://example.com/banner.jpg");

      const courseInDb = await Course.findOne({ name: "New Course" });
      expect(courseInDb).not.toBeNull();
    });

    it("should not allow a regular user to add a course", async () => {
      const category = await Category.create({ name: "Test Category" });
      const module = await CourseModule.create({
        name: "Test Module",
        description: "Module Description",
        moduleNumber: 1,
        moduleDuration: 2,
        moduleContent: [{ name: "Content 1", duration: 1 }],
        category: category._id
      });

      const res = await request(app)
        .post("/api/course/addCourse")
        .set("Cookie", `token=${userToken}`)
        .field("name", "New Course")
        .field("description", "Course Description")
        .field("duration", 10)
        .field("rating", 4.5)
        .field("category", category._id.toString())
        .field("modules", module._id.toString())
        .attach("banner", Buffer.from("test"), "banner.jpg");

      expect(res.statusCode).toBe(403);
      expect(res.body).toHaveProperty("message", "Access denied. Admins only.");
    });

    it("should handle server error", async () => {
      jest.spyOn(Course.prototype, 'save').mockImplementation(() => {
        throw new Error("Server error");
      });

      const category = await Category.create({ name: "Test Category" });
      const module = await CourseModule.create({
        name: "Test Module",
        description: "Module Description",
        moduleNumber: 1,
        moduleDuration: 2,
        moduleContent: [{ name: "Content 1", duration: 1 }],
        category: category._id
      });

      const res = await request(app)
        .post("/api/course/addCourse")
        .set("Cookie", `token=${adminToken}`)
        .field("name", "New Course")
        .field("description", "Course Description")
        .field("duration", 10)
        .field("rating", 4.5)
        .field("category", category._id.toString())
        .field("modules", module._id.toString())
        .attach("banner", Buffer.from("test"), "banner.jpg");

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty("error", "Server error");

      Course.prototype.save.mockRestore(); 
    });
  });

  describe("delete course by id", () => {
    it("should delete a course by admin", async () => {
      const course = await Course.create({
        name: "Course to Delete",
        description: "Course Description",
        duration: 10,
        rating: 4.5,
        trainers: [],
        category: new mongoose.Types.ObjectId(),
        modules: []
      });

      const res = await request(app)
        .delete(`/api/course/${course._id}`)
        .set("Cookie", `token=${adminToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "Course Deleted Successfully");

      const courseInDb = await Course.findById(course._id);
      expect(courseInDb).toBeNull();
    });

    it("should not allow a regular user to delete a course", async () => {
      const course = await Course.create({
        name: "Course to Delete",
        description: "Course Description",
        duration: 10,
        rating: 4.5,
        trainers: [],
        category: new mongoose.Types.ObjectId(),
        modules: []
      });

      const res = await request(app)
        .delete(`/api/course/${course._id}`)
        .set("Cookie", `token=${userToken}`);

      expect(res.statusCode).toBe(403);
      expect(res.body).toHaveProperty("message", "Access denied. Admins only.");
    });

    it("should return 404 if course not found", async () => {
      const invalidCourseId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .delete(`/api/course/${invalidCourseId}`)
        .set("Cookie", `token=${adminToken}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message", "Course not found");
    });

    it("should handle server error", async () => {
      jest.spyOn(Course, 'findByIdAndDelete').mockImplementation(() => {
        throw new Error("Server error");
      });

      const course = await Course.create({
        name: "Course to Delete",
        description: "Course Description",
        duration: 10,
        rating: 4.5,
        trainers: [],
        category: new mongoose.Types.ObjectId(),
        modules: []
      });

      const res = await request(app)
        .delete(`/api/course/${course._id}`)
        .set("Cookie", `token=${adminToken}`);

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty("error", "Server error");

      Course.findByIdAndDelete.mockRestore(); 
    });
  });
});