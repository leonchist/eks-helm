import { Request, Response } from "express";
import httpStatus from "http-status";
import { userService } from "services";
import { CustomError } from "errors";
import { comparePassword } from "utils/password";
import { jwtSign } from "utils/jwt";
import { MESSAGES } from "consts";
import { logInHandler } from "./logIn";

jest.mock("services", () => ({
  userService: {
    getUser: jest.fn(),
    getPassword: jest.fn(),
  },
}));

jest.mock("utils/password", () => ({
  comparePassword: jest.fn(),
}));

jest.mock("utils/jwt", () => ({
  jwtSign: jest.fn(),
}));

describe("logInHandler", () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {
      body: {
        email: "test@example.com",
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

  it("should return user and token when credentials are correct", async () => {
    const user = { id: 1, email: "test@example.com" };
    const password = "hashedpassword";
    const token = "testtoken";

    (userService.getUser as jest.Mock).mockResolvedValue(user);
    (userService.getPassword as jest.Mock).mockResolvedValue({ password });
    (comparePassword as jest.Mock).mockResolvedValue(true);
    (jwtSign as jest.Mock).mockReturnValue(token);

    await logInHandler(req, res);

    expect(userService.getUser).toHaveBeenCalledWith({
      email: "test@example.com",
    });
    expect(userService.getPassword).toHaveBeenCalledWith("test@example.com");
    expect(comparePassword).toHaveBeenCalledWith(
      "testpassword",
      "hashedpassword"
    );
    expect(jwtSign).toHaveBeenCalledWith(user);
    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    expect(res.json).toHaveBeenCalledWith({ user, token });
  });

  it("should throw a CustomError when user is not found", async () => {
    (userService.getUser as jest.Mock).mockResolvedValue(null);

    await expect(logInHandler(req, res)).rejects.toThrow(
      new CustomError(MESSAGES.CREDENTIAL_NOT_CORRECT, httpStatus.BAD_REQUEST)
    );

    expect(userService.getUser).toHaveBeenCalledWith({
      email: "test@example.com",
    });
    expect(userService.getPassword).not.toHaveBeenCalled();
    expect(comparePassword).not.toHaveBeenCalled();
    expect(jwtSign).not.toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("should throw a CustomError when password is incorrect", async () => {
    const user = { id: 1, email: "test@example.com" };
    const password = "hashedpassword";

    (userService.getUser as jest.Mock).mockResolvedValue(user);
    (userService.getPassword as jest.Mock).mockResolvedValue({ password });
    (comparePassword as jest.Mock).mockResolvedValue(false);

    await expect(logInHandler(req, res)).rejects.toThrow(
      new CustomError(MESSAGES.CREDENTIAL_NOT_CORRECT, httpStatus.BAD_REQUEST)
    );

    expect(userService.getUser).toHaveBeenCalledWith({
      email: "test@example.com",
    });
    expect(userService.getPassword).toHaveBeenCalledWith("test@example.com");
    expect(comparePassword).toHaveBeenCalledWith(
      "testpassword",
      "hashedpassword"
    );
    expect(jwtSign).not.toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
