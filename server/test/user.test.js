// const mongoose = require("mongoose");
// const request = require("supertest");
// const app = require("../index");
// const User = require("../model/userModel");

// require("dotenv").config();

// beforeEach(async () => {
//   await mongoose.connect(process.env.MONGO_URL);
  
// });

// describe("Testing User Registration", () => {
//     it("should return a category", async () => {
//       await User.create({ name: "Test User" }); 
//     const res = await request(app).get("/api/category/");
//      const body=res.body


//     expect(res.statusCode).toBe(200);
//     expect(res.body).toBeInstanceOf(Array); 
//     expect(res.body.length).toBeGreaterThan(0); 
//     expect(res.body[res.body.length-1]).toHaveProperty("name", "Test Category"); 
    
//     await Category.findByIdAndDelete(body[body.length-1]._id)
//   });
// });





// afterEach(async () => {
//     await mongoose.connection.close();
//   });










const mongoose = require("mongoose");
const app = require("../index"); // Adjust the path as necessary
const User = require("../model/userModel"); // Adjust the path as necessary
const supertest = require("supertest");

require("dotenv").config();
const request = supertest(app);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL_TEST);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Testing User Registration and Update", () => {
  let userId;

  beforeEach(async () => {
    // Clean up the user collection before each test
    await User.deleteMany();
  });

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

  it("should update the user's information successfully", async () => {
    // Assuming the user has already been created in the previous test

    const res = await supertest(app)
      .put(`/api/users/${userId}`) 
      .send({
        name: "Updated User",
        email: "testuser@example.com", 
        password: "newpassword123",
        role: "User",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "User updated successfully");

    const updatedUserInDb = await User.findById(userId);
    expect(updatedUserInDb).not.toBeNull();
    expect(updatedUserInDb.name).toBe("Updated User");
  });
});


  it("should not allow registration of a user with an existing email", async () => {
    await User.create({
      name: "Existing User",
      email: "existinguser@example.com",
      password: "password123",
      role: "User",
    });

    const res = await supertest(app)
      .post("/api/register")
      .send({
        name: "Another User",
        email: "existinguser@example.com", 
        password: "password456",
        role: "User",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "User already exists");
    await User.deleteOne({ email: "existinguser@example.com" });
    
  });

//   it("should not allow admin or trainer to create themselves", async () => {
//     const res = await request(app)
//       .post("/api/register")
//       .send({
//         name: "Admin User",
//         email: "admin@example.com",
//         password: "adminpass",
//         role: "Admin", 
//       });

//     expect(res.statusCode).toBe(400);
//     expect(res.body).toHaveProperty("message", "Admin cannot create himself");

//     const trainerRes = await request(app)
//       .post("/api/register")
//       .send({
//         name: "Trainer User",
//         email: "trainer@example.com",
//         password: "trainerpass",
//         role: "Trainer", 
//       });

//     expect(trainerRes.statusCode).toBe(400);
//     expect(trainerRes.body).toHaveProperty("message", "Trainer cannot create himself");
//   });
// });

