import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { StatusCodes } from "http-status-codes";
import AppError from "../../utils/appError.js";
import { reviewServices } from "./review.service.js";

const postReview = catchAsync(async (req: Request, res: Response) => {
	// const studentId = req.user?.userId as string;
	// const { courseId, rating, review } = req.body;


	const result = await reviewServices.postReview(req.body, req.user?.userId);

	sendResponse(res, {
		data: result,
		success: true,
		message: "Review posted successfully",
		statusCode: StatusCodes.CREATED
	});

});


export const reviewControllers = {

	postReview
};
