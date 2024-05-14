import { Response } from "express";
import httpStatus from "http-status";
import { userService } from "services";
import { AuthRequest } from "types";
import { getUserHandler } from "./getUser";

jest.mock("services", () => ({
  userService: {
    getUser: jest.fn(),
  },
}));

describe("getUserHandler", () => {
  let req: AuthRequest<unknown, unknown, unknown, unknown>;
  let res: Response;

  beforeEach(() => {
    req = {
      user: {
        email: "test@example.com",
      },
    } as AuthRequest<unknown, unknown, unknown, unknown>;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch the user and return the result", async () => {
    const user = { id: 1, email: "test@example.com", name: "Test User" };
    (userService.getUser as jest.Mock).mockResolvedValue(user);

    await getUserHandler(req, res);

    expect(userService.getUser).toHaveBeenCalledWith({
      email: "test@example.com",
    });
    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    expect(res.json).toHaveBeenCalledWith(user);
  });

  it("should handle a user not found", async () => {
    (userService.getUser as jest.Mock).mockResolvedValue(null);

    await getUserHandler(req, res);

    expect(userService.getUser).toHaveBeenCalledWith({
      email: "test@example.com",
    });
    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    expect(res.json).toHaveBeenCalledWith(null);
  });
});
