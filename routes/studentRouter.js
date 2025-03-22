import {assignStudentToCourse,createStudent,
    delateStudent,getAllStudents,getStudent,removeCourse
    ,updatetudent,nameSearch} from "../controller/studentController.js";
import {createdAt,updatedAt} from "../middleware/audit.js";
import {protect,restrictTo} from '../controller/authController.js'

import express from 'express';

const studentRouter = express.Router();
studentRouter.use(protect,restrictTo('admin','super-admin'))
studentRouter.route('/')
.post(createdAt,createStudent)
.get(getAllStudents)

studentRouter.route('/:id')
.get(getStudent)
.patch(updatedAt,updatetudent)
.delete(delateStudent)
.put(updatedAt,assignStudentToCourse)

studentRouter.put('/:id/removeCourses',removeCourse);
studentRouter.post('/search',nameSearch)

export {studentRouter}