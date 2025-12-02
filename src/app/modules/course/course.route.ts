import { Router } from "express";
import { courseControllers } from "./course.controller.js";
import { auth } from "../../middleware/auth.js";
import { Role } from "../auth/auth.interface.js";

const router = Router()

router.post('/create-course', auth(Role.ADMIN), courseControllers.createCourse)
router.get('/all', courseControllers.getAllCourses)
router.post('/:courseId/create-lesson', courseControllers.createLesson)

export const courseRoutes = router