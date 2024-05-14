import { Request, Response } from "express";
import httpStatus from "http-status";
import { todoService } from "services";
import { OrderBy, Status } from "types";
import { getAllTodoHandler } from "./getAllTodos";

jest.mock("services", () => ({
  todoService: {
    getAllTodo: jest.fn(),
  },
}));

describe("getAllTodoHandler", () => {
  let req: Request<
    unknown,
    unknown,
    unknown,
    {
      title?: string;
      status?: Status;
      page?: number;
      limit?: number;
      sortBy?: string;
      orderBy?: OrderBy;
    }
  >;
  let res: Response;

  beforeEach(() => {
    req = {
      query: {
        title: "Test Todo",
        status: "DONE",
        page: 1,
        limit: 10,
        sortBy: "createdAt",
        orderBy: "DESC",
      },
    } as Request<
      unknown,
      unknown,
      unknown,
      {
        title?: string;
        status?: Status;
        page?: number;
        limit?: number;
        sortBy?: string;
        orderBy?: OrderBy;
      }
    >;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch all todos and return the result", async () => {
    const todos = [
      { id: 1, title: "Test Todo 1", status: "DONE" },
      { id: 2, title: "Test Todo 2", status: "TODO" },
    ];
    const totalCount = 2;

    (todoService.getAllTodo as jest.Mock).mockResolvedValue({
      todos,
      totalCount,
    });

    await getAllTodoHandler(req, res);

    expect(todoService.getAllTodo).toHaveBeenCalledWith(
      "Test Todo",
      "DONE",
      1,
      10,
      "createdAt",
      "DESC"
    );
    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    expect(res.json).toHaveBeenCalledWith({ todos, totalCount });
  });

  it("should fetch all todos with default query parameters", async () => {
    req.query = {};
    const todos = [{ id: 1, title: "Test Todo 1", status: "TODO" }];
    const totalCount = 1;

    (todoService.getAllTodo as jest.Mock).mockResolvedValue({
      todos,
      totalCount,
    });

    await getAllTodoHandler(req, res);

    expect(todoService.getAllTodo).toHaveBeenCalledWith(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    );
    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    expect(res.json).toHaveBeenCalledWith({ todos, totalCount });
  });
});
