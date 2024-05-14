import { Response } from "express";
import httpStatus from "http-status";
import { todoService } from "services";
import { AuthRequest } from "types";
import { updateTodoHandler } from "./updateTodo";

jest.mock("services", () => ({
  todoService: {
    updateTodo: jest.fn(),
  },
}));

describe("updateTodoHandler", () => {
  let req: AuthRequest<
    {
      id: number;
    },
    unknown,
    {
      title: string;
      description: string;
      status: string;
    },
    unknown
  >;
  let res: Response;

  beforeEach(() => {
    req = {
      params: {
        id: 1,
      },
      body: {
        title: "Updated Todo",
        description: "This is an updated todo",
        status: "DONE",
      },
      user: {
        id: 1,
      },
    } as AuthRequest<
      {
        id: number;
      },
      unknown,
      {
        title: string;
        description: string;
        status: string;
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

  it("should update a todo and return the result", async () => {
    const updatedTodo = {
      id: 1,
      title: "Updated Todo",
      description: "This is an updated todo",
      status: "DONE",
    };
    (todoService.updateTodo as jest.Mock).mockResolvedValue(updatedTodo);

    await updateTodoHandler(req, res);

    expect(todoService.updateTodo).toHaveBeenCalledWith(
      1,
      "Updated Todo",
      "This is an updated todo",
      1,
      "DONE"
    );
    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    expect(res.json).toHaveBeenCalledWith(updatedTodo);
  });
});
