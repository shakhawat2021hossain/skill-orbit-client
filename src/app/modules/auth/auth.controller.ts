import { type Request, type Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { authServices } from "./auth.service.js";
import { StatusCodes } from "http-status-codes"


const register = catchAsync(async(req: Request, response: Response) =>{
    const result =  await authServices.register(req.body)
    sendResponse(response, {
        data: result,
        success: true,
        message: "created user successfully!",
        statusCode: StatusCodes.CREATED
    })
})

const credentialLogin = catchAsync(async(req: Request, response: Response) =>{
    const result =  await authServices.credentialLogin(req.body)
    sendResponse(response, {
        data: result,
        success: true,
        message: "Login user successfully!",
        statusCode: StatusCodes.OK
    })
})



export const authControllers = {
    register,
    credentialLogin
}