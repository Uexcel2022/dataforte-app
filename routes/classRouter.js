import {createInstructor,deleteInstructor,changeInstructor,
    getAllInstructors,getInstructor,assginCourseToClass,removeCourse} 
    from '../controller/classController.js'
import {protect,restrictTo} from '../controller/authController.js'
import {createdAt, updatedAt} from '../middleware/audit.js'
import express from 'express'

const classRouter = express.Router();

classRouter.use(protect,restrictTo('admin','super-admin'))

classRouter.route('/')
.post(createdAt, createInstructor)
.get(getAllInstructors);


classRouter.route('/:id')
.get(getInstructor)
.patch(updatedAt,assginCourseToClass)
.delete(deleteInstructor)
.put(updatedAt,removeCourse);

classRouter.patch('/:id/change-ins',changeInstructor);

export {classRouter}