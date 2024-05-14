import { Response } from "express";
import httpStatus from "http-status";
import { todoService } from "services";
import { AuthRequest } from "types";
import { createTodoHandler } from "./createTodo";

jest.mock("services", () => ({
  todoService: {
    createTodo: jest.fn(),
  },
}));

describe("createTodoHandler", () => {
  let req: AuthRequest<
    unknown,
    unknown,
    {
      title: string;
      description?: string;
    },
    unknown
  >;
  let res: Response;

  beforeEach(() => {
    req = {
      body: {
        title: "Test Todo",
        description: "This is a test todo",
      },
      user: {
        id: 1,
      },
    } as AuthRequest<
      unknown,
      unknown,
      {
        title: string;
        description?: string;
      },
      unknown
    >;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new todo and return the result", async () => {
    const todoResult = {
      id: 1,
      title: "Test Todo",
      description: "This is a test todo",
    };
    (todoService.createTodo as jest.Mock).mockResolvedValue(todoResult);

    await createTodoHandler(req, res);

    expect(todoService.createTodo).toHaveBeenCalledWith(
      1,
      "Test Todo",
      "This is a test todo"
    );
    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    expect(res.json).toHaveBeenCalledWith(todoResult);
  });

  it("should create a new todo without a description and return the result", async () => {
    const todoResult = { id: 1, title: "Test Todo", description: null };
    (todoService.createTodo as jest.Mock).mockResolvedValue(todoResult);

    req.body.description = undefined;
    await createTodoHandler(req, res);

    expect(todoService.createTodo).toHaveBeenCalledWith(
      1,
      "Test Todo",
      undefined
    );
    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    expect(res.json).toHaveBeenCalledWith(todoResult);
  });
});
