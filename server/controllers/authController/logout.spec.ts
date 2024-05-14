import { Request, Response } from "express";
import httpStatus from "http-status";
import { userService } from "services";
import { logOutHandler } from "./logout";

jest.mock("services", () => ({
  userService: {
    logout: jest.fn(),
  },
}));

describe("logOutHandler", () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {
      header: jest.fn().mockReturnValue("Bearer token"),
    } as unknown as Request;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should log out the user and return a success message", async () => {
    await logOutHandler(req, res);

    expect(req.header).toHaveBeenCalledWith("Authorization");
    expect(userService.logout).toHaveBeenCalledWith("token");
    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    expect(res.json).toHaveBeenCalledWith({ message: "Successfully logout!" });
  });
});
