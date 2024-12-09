const Tasks = require("../models/tasksModel");

const { getTasks } = require("./tasksService");

jest.mock("../models/tasksModel", () => ({
  getAll: jest.fn(),
}));

describe("Task Service - getTasks", () => {
  it("should return a list of tasks", async () => {
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockTasks = [
      { id: "task1", name: "Task 1", description: "Description 1" },
      { id: "task2", name: "Task 2", description: "Description 2" },
    ];

    Tasks.getAll.mockResolvedValue(mockTasks);

    await getTasks(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith(mockTasks);
    expect(Tasks.getAll).toHaveBeenCalled();
  });

  it("should handle errors gracefully", async () => {
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Tasks.getAll.mockRejectedValue(new Error("Database error"));

    await getTasks(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Failed to fetch tasks",
    });
    expect(Tasks.getAll).toHaveBeenCalled();
  });
});
