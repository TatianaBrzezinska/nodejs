const Task = require("../models/taskDetailsModel");
const { getTask, createTask, updateTask, deleteTask } = require("./taskDetailsService");

jest.mock("../models/taskDetailsModel", () => ({
  getById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

describe("Task Details Service", () => {
  describe("getTask", () => {
    it("should return 404 if task is not found", async () => {
      const mockReq = { params: { id: "task1" }, user: { id: "user1" } };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Task.getById.mockResolvedValue(null);

      await getTask(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: "Task not found" });
      expect(Task.getById).toHaveBeenCalledWith({
        where: { id: "task1", user_id: "user1" },
      });
    });

    it("should return the task if found", async () => {
      const mockReq = { params: { id: "task1" }, user: { id: "user1" } };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockTask = {
        id: "task1",
        name: "Test Task",
        description: "Test Task Description",
        user_id: "user1",
      };

      Task.getById.mockResolvedValue(mockTask);

      await getTask(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith(mockTask);
      expect(Task.getById).toHaveBeenCalledWith({
        where: { id: "task1", user_id: "user1" },
      });
    });
  });

  describe("createTask", () => {
    it("should create a task successfully", async () => {
      const mockReq = {
        body: {
          name: "New Task",
          description: "New Task Description",
          finished_at: "2024-12-31",
        },
        user: { id: "user1" },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockTask = {
        id: "task1",
        name: "New Task",
        description: "New Task Description",
        finished_at: "2024-12-31",
        user_id: "user1",
      };

      Task.create.mockResolvedValue(mockTask);

      await createTask(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockTask);
      expect(Task.create).toHaveBeenCalledWith({
        name: "New Task",
        description: "New Task Description",
        finished_at: "2024-12-31",
        user_id: "user1",
      });
    });
  });

  describe("updateTask", () => {
    it("should return 404 if task is not found or not authorized", async () => {
      const mockReq = {
        params: { id: "task1" },
        body: { name: "Updated Task" },
        user: { id: "user1" },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Task.update.mockResolvedValue([0]);

      await updateTask(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Task not found or not authorized",
      });
      expect(Task.update).toHaveBeenCalledWith({ name: "Updated Task" }, { where: { id: "task1", user_id: "user1" } });
    });

    it("should update the task successfully", async () => {
      const mockReq = {
        params: { id: "task1" },
        body: { name: "Updated Task" },
        user: { id: "user1" },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Task.update.mockResolvedValue([1]);

      await updateTask(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Task updated successfully",
      });
      expect(Task.update).toHaveBeenCalledWith({ name: "Updated Task" }, { where: { id: "task1", user_id: "user1" } });
    });
  });

  describe("deleteTask", () => {
    it("should return 404 if task is not found or not authorized", async () => {
      const mockReq = { params: { id: "task1" }, user: { id: "user1" } };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Task.delete.mockResolvedValue(0);

      await deleteTask(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Task not found or not authorized",
      });
      expect(Task.delete).toHaveBeenCalledWith({
        where: { id: "task1", user_id: "user1" },
      });
    });

    it("should delete the task successfully", async () => {
      const mockReq = { params: { id: "task1" }, user: { id: "user1" } };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Task.delete.mockResolvedValue(1);

      await deleteTask(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Task deleted successfully",
      });
      expect(Task.delete).toHaveBeenCalledWith({
        where: { id: "task1", user_id: "user1" },
      });
    });
  });
});
