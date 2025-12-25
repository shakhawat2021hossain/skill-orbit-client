import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { wishlistServices } from "./wishlist.service.js";
import { StatusCodes } from "http-status-codes";

const addToWishlist = catchAsync(async (req: Request, res: Response) => {
	const userId = req.user?.userId as string;
	const courseId = req.params.courseId as string;
	const result = await wishlistServices.addToWishlist(userId, courseId);

	sendResponse(res, {
		data: result,
		success: true,
		message: "Added to wishlist successfully!",
		statusCode: StatusCodes.OK
	});
});

const removeFromWishlist = catchAsync(async (req: Request, res: Response) => {
	const userId = req.user?.userId as string;
	const courseId = req.params.courseId as string;
	const result = await wishlistServices.removeFromWishlist(userId, courseId);

	sendResponse(res, {
		data: result,
		success: true,
		message: "Removed from wishlist successfully!",
		statusCode: StatusCodes.OK
	});
});

const getWishlist = catchAsync(async (req: Request, res: Response) => {
	const userId = req.user?.userId as string;
	console.log("hitted getwishlist")
	const result = await wishlistServices.getWishlist(userId);

	sendResponse(res, {
		data: result,
		success: true,
		message: "Retrieved wishlist successfully!",
		statusCode: StatusCodes.OK
	});
});


export const wishlistControllers = {
	addToWishlist,
	getWishlist,
	removeFromWishlist
};
