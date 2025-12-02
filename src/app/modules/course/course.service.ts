import type { ICourse, ILesson } from "./course.interface.js"
import { Course, Lesson } from "./course.model.js"

const createCourse = async (payload: ICourse, adminId: string) => {
    const courseData = {
        ...payload,
        createdBy: adminId
    }
    const course = await Course.create(courseData)
    return course

}


const createLesson = async (payload: ILesson, courseId: string) => {
    
    const lesson = await Lesson.create({...payload, courseId})
    return lesson

}

// const addLesson = async (courseId: string, lessons: ILesson) => {


//     const course = await Course.findByIdAndUpdate(
//         courseId,
//         { $push: { syllabus: { $each: lessons } } },
//         { new: true }
//     );

//     // Optionally, recalc totalDuration
//     if (course) {
//         course.totalDuration = course?.syllabus?.reduce((sum, lesson) => sum + (lesson.duration || 0), 0) as number;
//         await course.save();
//     }

//     return course




// }




export const courseServices = {
    // addLesson,
    createLesson,
    createCourse
}