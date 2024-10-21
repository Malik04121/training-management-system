const mongoose = require("mongoose");
const {app} = require("../app"); 
const User = require("../model/userModel"); 
const supertest = require("supertest");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { start } = require("../index");
require("dotenv").config();


let server;
let adminToken;
let userToken;
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL_TEST);
  server=await start()
  adminToken = jwt.sign({ userId: "adminUserId", role: "Admin" }, process.env.JWT_SECRET, { expiresIn: '1d' });
  userToken = jwt.sign({ userId: "regularUserId", role: "User" }, process.env.JWT_SECRET, { expiresIn: '1d' });

});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
  
  
});
beforeEach(async () => {

  await User.deleteMany();
});

  describe("User Registration and Update", () => {
    it("should register a new user successfully", async () => {
      const res = await supertest(app)
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

      const res = await supertest(app)
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
      const res = await supertest(app)
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
      const res = await supertest(app)
        .post("/api/users/login")
        .send({
          email: "wrongemail@example.com",
          password: "password123",
        });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("message", "Invalid email or password");
    });

    it("should not login a user with incorrect password", async () => {
      const res = await supertest(app)
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
      const res = await supertest(app)
        .get("/api/users/logout")
        .set("Cookie", `token=${userToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "Logged out successfully");
      expect(res.headers['set-cookie']).toBeDefined();
    });

    it("should handle logout without a token", async () => {
      const res = await supertest(app)
        .get("/api/users/logout");

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "Logged out successfully");
    });

    it("should handle server error during logout", async () => {
      // Mock the clearCookie method to throw an error
      const originalClearCookie = app.response.clearCookie;
      app.response.clearCookie = jest.fn(() => {
        throw new Error("Server error");
      });

      const res = await supertest(app)
        .get("/api/users/logout")
        .set("Cookie", `token=${userToken}`);

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty("error", "Server error");

      // Restore the original clearCookie method
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
      const res = await supertest(app)
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

      const res = await supertest(app)
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

      expect(res.statusCode).toBe(403); // Assuming your middleware returns 403 for forbidden access
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

      const res = await supertest(app)
        .post("/api/users/addTrainer")
        .set("Cookie", `token=${adminToken}`)
        .send({
          name: "New Trainer",
          email: "trainer@example.com", // Same email as existing trainer
          password: "newtrainerpassword",
          trainerDescription: "New trainer",
          averagePricePerHour: 60,
          trainerRating: 4.0,
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message", "User with this email already exists");
    });

    it("should return 401 if no token is provided", async () => {
      const res = await supertest(app)
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

      const res = await supertest(app)
        .get("/api/users")
        .set("Cookie", `token=${adminToken}`)
        .query({ role: "Trainer" });

      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty("email", "trainer@example.com");
      expect(res.body[0]).toHaveProperty("name", "Trainer User");
      expect(res.body[0]).toHaveProperty("role", "Trainer");
      expect(res.body[0]).not.toHaveProperty("password");
    });

    it("should return 400 if role parameter is missing", async () => {
      const res = await supertest(app)
        .get("/api/users")
        .set("Cookie", `token=${adminToken}`);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message", "Role parameter is required");
    });

    it("should return 404 if no users found for the given role", async () => {
      const res = await supertest(app)
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

      const res = await supertest(app)
        .get("/api/users")
        .set("Cookie", `token=${adminToken}`)
        .query({ role: "Trainer" });

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty("error", "Server error");

      User.find.mockRestore(); // Restore original method
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
      const res = await supertest(app)
        .get("/api/users/loginUserData")
        .set("Cookie", `token=${userToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "Login User Detail Fetched Successfully");
      expect(res.body.data).toHaveProperty("email", "testuser@example.com");
      expect(res.body.data).toHaveProperty("name", "Test User");
    });

    it("should return 401 if no token is provided", async () => {
      const res = await supertest(app)
        .get("/api/users/loginUserData");

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("message", "No token provided");
    });

    it("should return 403 if token is invalid", async () => {
      const res = await supertest(app)
        .get("/api/users/loginUserData")
        .set("Cookie", `token=invalidtoken`);

      expect(res.statusCode).toBe(403);
      expect(res.body).toHaveProperty("message", "Invalid token");
    });

    it("should return 404 if user is not found", async () => {
      const invalidToken = jwt.sign({ userId: new mongoose.Types.ObjectId(), role: "User" }, process.env.JWT_SECRET, { expiresIn: '1d' });

      const res = await supertest(app)
        .get("/api/users/loginUserData")
        .set("Cookie", `token=${invalidToken}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("message", "User not found");
    });

    it("should return 500 if there is a server error", async () => {
      jest.spyOn(User, 'findById').mockImplementation(() => {
        throw new Error("Server error");
      });

      const res = await supertest(app)
        .get("/api/users/loginUserData")
        .set("Cookie", `token=${userToken}`);

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty("error", "Server error");

      User.findById.mockRestore(); // Restore original method
    });
  });

  // describe("Add Course to User", () => {
  //   beforeEach(async () => {
  //     const hashedPassword = await bcrypt.hash("password123", 10);
  //     const user = await User.create({
  //       name: "Test User",
  //       email: "testuser@example.com",
  //       password: hashedPassword,
  //       role: "User",
  //       courses: [],
  //     });

  //     userId = user._id;
  //     userToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

  //     const course = await Course.create({
  //       name: "Test Course",
  //       description: "Test Course Description",
  //       enrolledPeople: [],
  //     });

  //     courseId = course._id;

  //     const trainer = await User.create({
  //       name: "Test Trainer",
  //       email: "testtrainer@example.com",
  //       password: "password123",
  //       role: "Trainer",
  //     });

  //     trainerId = trainer._id;
  //   });
  //   it("should add a course to the user successfully", async () => {
  //     const res = await supertest(app)
  //       .patch(`/api/users/${userId}/course`)
  //       .set("Cookie", `token=${userToken}`)
  //       .send({ courseId, trainerId });

  //     expect(res.statusCode).toBe(200);
  //     expect(res.body).toHaveProperty("message", "Course and trainer added successfully");
  //     expect(res.body.user.courses).toBeInstanceOf(Array);
  //     expect(res.body.user.courses.length).toBe(1);
  //     expect(res.body.user.courses[0]).toHaveProperty("courseId", courseId.toString());
  //     expect(res.body.user.courses[0]).toHaveProperty("trainerId", trainerId.toString());
  //   });
  //   it("should return 401 if no token is provided", async () => {
  //     const res = await supertest(app)
  //       .patch(`/api/users/${userId}/course`)
  //       .send({ courseId, trainerId });

  //     expect(res.statusCode).toBe(401);
  //     expect(res.body).toHaveProperty("message", "No authentication token, access denied");
  //   });
  //   it("should return 403 if token is invalid", async () => {
  //     const res = await supertest(app)
  //       .patch(`/api/users/${userId}/course`)
  //       .set("Cookie", `token=invalidtoken`)
  //       .send({ courseId, trainerId });
  
  //     expect(res.statusCode).toBe(403);
  //     expect(res.body).toHaveProperty("message", "Invalid token");
  //   });
  
  //   it("should return 404 if user is not found", async () => {
  //     const invalidUserId = new mongoose.Types.ObjectId();
  //     const res = await supertest(app)
  //       .patch(`/api/users/${invalidUserId}/course`)
  //       .set("Cookie", `token=${userToken}`)
  //       .send({ courseId, trainerId });
  
  //     expect(res.statusCode).toBe(404);
  //     expect(res.body).toHaveProperty("message", "User not found");
  //   });
  //   it("should return 400 if user is already enrolled in the course", async () => {
  //     // Enroll the user in the course first
  //     await User.findByIdAndUpdate(userId, { $push: { courses: { courseId, trainerId } } });
  
  //     const res = await supertest(app)
  //       .patch(`/api/users/${userId}/course`)
  //       .set("Cookie", `token=${userToken}`)
  //       .send({ courseId, trainerId });
  
  //     expect(res.statusCode).toBe(400);
  //     expect(res.body).toHaveProperty("message", "You had already enrolled in this course.");
  //   });
  
  //   it("should return 500 if there is a server error", async () => {
  //     jest.spyOn(User.prototype, 'save').mockImplementation(() => {
  //       throw new Error("Server error");
  //     });
  
  //     const res = await supertest(app)
  //       .patch(`/api/users/${userId}/course`)
  //       .set("Cookie", `token=${userToken}`)
  //       .send({ courseId, trainerId });
  
  //     expect(res.statusCode).toBe(500);
  //     expect(res.body).toHaveProperty("error", "Server error");
  
  //     User.prototype.save.mockRestore(); // Restore original method
  //   });
  // })
// });