import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { UserService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const UpdateProfileImage = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		if (!req.file) {
			throw new Error("No File Provided.");
		}

		const userId = req.user?.userId; //userid
		const result = await UserService.UpdateProfileImage(
			req.file?.buffer,
			userId!,
		);

		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: "Profile image updated successfully",
			data: result,
		});
	},
);

export const UserController = {
	UpdateProfileImage,
};
