const request = require("supertest");
const express = require("express");
const { getTasks } = require("./tasksService");
const Tasks = require("../models/tasksModel");

jest.mock("../models/tasksModel");

const app = express();
app.use(express.json());
app.get("/tasks", (req, res) => {
  req.user = { id: 1 };
  getTasks(req, res);
});

describe("Tasks Service", () => {
  describe("GET /tasks", () => {
    it("should return tasks for a user", async () => {
      const mockTasks = [{ id: 1, name: "Test Task" }];
      Tasks.getAllByUser.mockResolvedValue(mockTasks);

      const res = await request(app).get("/tasks");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockTasks);
      expect(Tasks.getAllByUser).toHaveBeenCalledWith(1);
    });

    it("should return 500 if an error occurs", async () => {
      Tasks.getAllByUser.mockRejectedValue(new Error("Database error"));
      const res = await request(app).get("/tasks");
      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ error: "Failed to fetch tasks" });
    });
  });
});
