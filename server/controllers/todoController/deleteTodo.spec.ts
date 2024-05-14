import { Response } from "express";
import httpStatus from "http-status";
import { todoService } from "services";
import { AuthRequest } from "types";
import { deleteTodoHandler } from "./deleteTodo";

jest.mock("services", () => ({
  todoService: {
    deleteTodo: jest.fn(),
  },
}));

describe("deleteTodoHandler", () => {
  let req: AuthRequest<
    {
      id: number;
    },
    unknown,
    unknown,
    unknown
  >;
  let res: Response;

  beforeEach(() => {
    req = {
      params: {
        id: 1,
      },
    } as AuthRequest<
      {
        id: number;
      },
      unknown,
      unknown,
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

  it("should delete a todo and return the result", async () => {
    const deleteResult = {
      id: 1,
      title: "Test Todo",
      description: "This is a test todo",
    };
    (todoService.deleteTodo as jest.Mock).mockResolvedValue(deleteResult);

    await deleteTodoHandler(req, res);

    expect(todoService.deleteTodo).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    expect(res.json).toHaveBeenCalledWith(deleteResult);
  });
});
