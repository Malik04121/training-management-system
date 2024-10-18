const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");
const Category = require("../model/categoryModel");

require("dotenv").config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL_TEST);
});

afterEach(async () => {
  // Clean up the category collection after each test
  await Category.deleteMany();
});

describe("Category API Tests", () => {
  let categoryId;

  describe("GET /api/category/", () => {
    it("should return a category", async () => {
      const category = await Category.create({ name: "Test Category" });

      const res = await request(app).get("/api/category/");
      const body = res.body;

      expect(res.statusCode).toBe(200);
      expect(body).toBeInstanceOf(Array);
      expect(body.length).toBeGreaterThan(0);
      expect(body[body.length - 1]).toHaveProperty("name", "Test Category");

      categoryId = body[body.length - 1]._id; // Save category ID for later use
    });
  });

  describe("PUT /api/category/:id", () => {
    it("should update an existing category", async () => {
      const category = await Category.create({ name: "Old Category" });
      categoryId = category._id;

      const res = await request(app)
        .put(`/api/category/${categoryId}`)
        .send({ name: "Updated Category" });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "Category updated successfully");

      const updatedCategory = await Category.findById(categoryId);
      expect(updatedCategory).not.toBeNull();
      expect(updatedCategory.name).toBe("Updated Category");
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
