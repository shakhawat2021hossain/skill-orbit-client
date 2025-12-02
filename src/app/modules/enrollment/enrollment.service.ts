import mongoose from "mongoose"
import AppError from "../../utils/appError.js"
import { User } from "../auth/auth.model.js"
import { Course } from "../course/course.model.js"
import { Enrollment } from "./enrollment.model.js"
import { StatusCodes } from "http-status-codes"

const enroll = async (courseId: string, userId: string) => {
    const enrollment = await Enrollment.create({
        studentId: userId,
        courseId
    })

    await Course.findByIdAndUpdate(
        courseId,
        { $addToSet: { students: userId } },
        { new: true }
    )

    return enrollment

}

const updateProgress = async (courseId: string, studentId: string, lessonId: string) => {
    const enrollment = await Enrollment.findOne({ studentId, courseId });
    if (!enrollment) {
        throw new AppError(StatusCodes.NOT_FOUND, "Enrollment not found");
    }
    // console.log("progress")

    const lessonObjectId = new mongoose.Types.ObjectId(lessonId);
    if (enrollment.completedLessons.includes(lessonObjectId)) {
        return enrollment;
    }

    enrollment.completedLessons.push(lessonObjectId);

    const course = await Course.findById(courseId).populate("syllabus");
    if (!course) throw new Error("Course not found");

    const totalLessons = course.syllabus?.length || 0;

    enrollment.progress = totalLessons > 0
        ? Math.floor((enrollment.completedLessons.length / totalLessons) * 100)
        : 0;

    await enrollment.save();

    return enrollment;



}

export const enrollmentServices = {
    enroll,
    updateProgress
}