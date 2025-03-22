import {createCourse,getAllCourses,getCourse,searchName,
    updateCourse} from "../controller/courseController.js";
import express from 'express'
const courseRouter = express.Router();

courseRouter.route('/')
.post(createCourse).get(getAllCourses);

courseRouter.route('/:id').get(getCourse)
.patch(updateCourse)

courseRouter.post('/search',searchName)

export {courseRouter};