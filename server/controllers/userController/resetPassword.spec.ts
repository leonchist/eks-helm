import { Response } from "express";
import httpStatus from "http-status";
import { userService } from "services";
import { AuthRequest } from "types";
import { comparePassword, encryptPassword } from "utils";
import { CustomError } from "errors";
import { MESSAGES } from "consts";
import { resetPasswordHandler } from "./resetPassword";

jest.mock("services", () => ({
  userService: {
    getPassword: jest.fn(),
    resetPassword: jest.fn(),
  },
}));

jest.mock("utils", () => ({
  comparePassword: jest.fn(),
  encryptPassword: jest.fn(),
}));

describe("resetPasswordHandler", () => {
  let req: AuthRequest<
    unknown,
    unknown,
    {
      password: string;
      resetPasswd: string;
    },
    unknown
  >;
  let res: Response;

  beforeEach(() => {
    req = {
      body: {
        password: "oldpassword",
        resetPasswd: "newpassword",
      },
      user: {
        email: "test@example.com",
      },
    } as AuthRequest<
      unknown,
      unknown,
      {
        password: string;
        resetPasswd: string;
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

  it("should reset the password and return the updated user", async () => {
    const oldPassword = { password: "hashedoldpassword" };
    const updatedUser = {
      id: 1,
      email: "test@example.com",
      password: "hashednewpassword",
    };

    (userService.getPassword as jest.Mock).mockResolvedValue(oldPassword);
    (comparePassword as jest.Mock).mockResolvedValue(true);
    (encryptPassword as jest.Mock).mockResolvedValue("hashednewpassword");
    (userService.resetPassword as jest.Mock).mockResolvedValue(updatedUser);

    await resetPasswordHandler(req, res);

    expect(userService.getPassword).toHaveBeenCalledWith("test@example.com");
    expect(comparePassword).toHaveBeenCalledWith(
      "oldpassword",
      "hashedoldpassword"
    );
    expect(encryptPassword).toHaveBeenCalledWith("newpassword");
    expect(userService.resetPassword).toHaveBeenCalledWith(
      "test@example.com",
      "hashednewpassword"
    );
    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    expect(res.json).toHaveBeenCalledWith(updatedUser);
  });

  it("should throw a CustomError when the old password is incorrect", async () => {
    const oldPassword = { password: "hashedoldpassword" };

    (userService.getPassword as jest.Mock).mockResolvedValue(oldPassword);
    (comparePassword as jest.Mock).mockResolvedValue(false);

    await expect(resetPasswordHandler(req, res)).rejects.toThrow(
      new CustomError(MESSAGES.OLD_PASSWORD_NOT_CORRECT, httpStatus.BAD_REQUEST)
    );

    expect(userService.getPassword).toHaveBeenCalledWith("test@example.com");
    expect(comparePassword).toHaveBeenCalledWith(
      "oldpassword",
      "hashedoldpassword"
    );
    expect(encryptPassword).not.toHaveBeenCalled();
    expect(userService.resetPassword).not.toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
