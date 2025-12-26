import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { StatusCodes } from "http-status-codes";
import AppError from "../../utils/appError.js";
import { reviewServices } from "./review.service.js";

const postReview = catchAsync(async (req: Request, res: Response) => {
	const studentId = req.user?.userId as string;
	const { courseId, rating, review } = req.body;

	if (!courseId || typeof rating !== 'number') {
		throw new AppError(StatusCodes.BAD_REQUEST, "courseId and rating are required");
	}

	if (rating < 1 || rating > 5) {
		throw new AppError(StatusCodes.BAD_REQUEST, "rating must be between 1 and 5");
	}

	const result = await reviewServices.postReview({ courseId, rating, review } as any, studentId);

	sendResponse(res, {
		data: result,
		success: true,
		message: "Review posted successfully",
		statusCode: StatusCodes.CREATED
	});

});

const getReviews = catchAsync(async (req: Request, res: Response) => {
	const courseId = req.params.courseId as string;
	if (!courseId) {
		throw new AppError(StatusCodes.BAD_REQUEST, "courseId is required");
	}

	const result = await reviewServices.getReviews(courseId);

	sendResponse(res, {
		data: result,
		success: true,
		message: "Reviews retrieved successfully",
		statusCode: StatusCodes.OK
	});

});


export const reviewControllers = {

	postReview,
	getReviews
};
