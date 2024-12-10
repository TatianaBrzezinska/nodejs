const { getTask, createTask, updateTask, deleteTask } = require("./taskDetailsService");
const Task = require("../models/taskDetailsModel");

jest.mock("../models/taskDetailsModel");

describe("Task Details Service", () => {
  describe("GET /task/:id", () => {
    it("should return a task for the user", async () => {
      const mockTask = { id: 1, name: "Test Task" };
      Task.getById.mockResolvedValue(mockTask);

      const req = { params: { id: 1 }, user: { id: 1 } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      await getTask(req, res);

      expect(res.json).toHaveBeenCalledWith(mockTask);
      expect(Task.getById).toHaveBeenCalledWith(1, 1);
    });

    it("should return 404 if task not found", async () => {
      Task.getById.mockResolvedValue(null);

      const req = { params: { id: 1 }, user: { id: 1 } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      await getTask(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Task not found" });
    });
  });

  describe("POST /task", () => {
    it("should create a task", async () => {
      const mockTask = { id: 1, name: "New Task" };
      Task.create.mockResolvedValue(mockTask);

      const req = { body: { name: "New Task", description: "Test" }, user: { id: 1 } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      await createTask(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockTask);
      expect(Task.create).toHaveBeenCalledWith({
        name: "New Task",
        description: "Test",
        finished_at: undefined,
        user_id: 1,
      });
    });
  });

  describe("PUT /task/:id", () => {
    it("should update a task", async () => {
      const mockTask = { id: 1, name: "Updated Task" };
      Task.update.mockResolvedValue(mockTask);

      const req = {
        params: { id: 1 },
        body: { name: "Updated Task", description: "Updated" },
        user: { id: 1 },
      };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      await updateTask(req, res);

      expect(res.json).toHaveBeenCalledWith(mockTask);
      expect(Task.update).toHaveBeenCalledWith(1, 1, {
        name: "Updated Task",
        description: "Updated",
        finished_at: undefined,
      });
    });

    it("should return 404 if task not found", async () => {
      Task.update.mockResolvedValue(null);

      const req = {
        params: { id: 1 },
        body: { name: "Updated Task" },
        user: { id: 1 },
      };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      await updateTask(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Task not found or not authorized" });
    });
  });

  describe("DELETE /task/:id", () => {
    it("should delete a task", async () => {
      Task.delete.mockResolvedValue(true);

      const req = { params: { id: 1 }, user: { id: 1 } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      await deleteTask(req, res);

      expect(res.json).toHaveBeenCalledWith({ message: "Task deleted successfully" });
      expect(Task.delete).toHaveBeenCalledWith(1, 1);
    });

    it("should return 404 if task not found", async () => {
      Task.delete.mockResolvedValue(false);

      const req = { params: { id: 1 }, user: { id: 1 } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      await deleteTask(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Task not found or not authorized" });
    });
  });
});
