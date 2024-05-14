import { Request, Response } from "express";
import httpStatus from "http-status";
import { MESSAGES } from "consts";
import { userService } from "services";
import { ArgumentValidationError } from "errors";
import { encryptPassword } from "utils";
import { registerHandler } from "./register";

jest.mock("services", () => ({
  userService: {
    getUser: jest.fn(),
    createUser: jest.fn(),
  },
}));

jest.mock("utils", () => ({
  Logger: {
    log: jest.fn(),
  },
  encryptPassword: jest.fn(),
}));

describe("registerHandler", () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {
      body: {
        email: "test@example.com",
        name: "Test User",
        password: "testpassword",
      },
    } as Request;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should register a new user and return the result", async () => {
    const user = { id: 1, email: "test@example.com", name: "Test User" };
    const hashedPassword = "hashedtestpassword";

    (userService.getUser as jest.Mock).mockResolvedValue(null);
    (encryptPassword as jest.Mock).mockResolvedValue(hashedPassword);
    (userService.createUser as jest.Mock).mockResolvedValue(user);

    await registerHandler(req, res);

    expect(userService.getUser).toHaveBeenCalledWith({
      email: "test@example.com",
    });
    expect(encryptPassword).toHaveBeenCalledWith("testpassword");
    expect(userService.createUser).toHaveBeenCalledWith(
      "Test User",
      "test@example.com",
      "hashedtestpassword"
    );
    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    expect(res.json).toHaveBeenCalledWith(user);
  });

  it("should throw an ArgumentValidationError when the email is already registered", async () => {
    const existingUser = {
      id: 1,
      email: "test@example.com",
      name: "Test User",
    };

    (userService.getUser as jest.Mock).mockResolvedValue(existingUser);

    await expect(registerHandler(req, res)).rejects.toThrow(
      new ArgumentValidationError(
        `${req.body.email} is already registered. Please sign in or change another email address`,
        [
          {
            email: `${req.body.email} is already registered. Please sign in or change another email address`,
          },
        ],
        MESSAGES.DUPLICATED_ACCOUNT
      )
    );

    expect(userService.getUser).toHaveBeenCalledWith({
      email: "test@example.com",
    });
    expect(encryptPassword).not.toHaveBeenCalled();
    expect(userService.createUser).not.toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
