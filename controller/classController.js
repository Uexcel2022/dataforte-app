import catchAsync from "../utils/catch.js"
import {Class} from '../models/classModel.js'
import AppError from "../utils/AppError.js"
import {createOne, deleteOne, findMany, findOne} from './handleFactory.js'


const assginCourseToClass = catchAsync( async (req,resp,next) => {
    const updatedAt = req.body.updatedAt;
    const updatedBy = req.body.updatedBy
    req.body.updatedBy = undefined;
    req.body.updatedAt = undefined;
    const instructor = 
    await Class.findByIdAndUpdate(req.params.id,{$addToSet: req.body,updatedAt,updatedBy},{new: true})

    if(!instructor){
        return next(new AppError('No instructor with the ID',404))
    }
    resp.status(200).json({
        status: 'success',
        data: {
            instructor
        }
    })
})

const removeCourse = catchAsync(async(req,resp,next)=>{
    const instructor = await Class.findById(req.params.id);
    if(!instructor){
        return next(new AppError('No instructor found with that ID',404))
    }
    const toRemoveCourses = req.body.courses;
    const courses = await JSON.parse(JSON.stringify(instructor.courses));
     const updatedCourses = await courses.filter(el=>!toRemoveCourses.includes(el))
     instructor.courses=updatedCourses
     instructor.save();
    resp.status(200).json({
        status: 'success',
        data: {
            instructor
        }
    })
})

const changeInstructor = catchAsync(async(req,res, next)=>{
    const updatedInst = 
    await Class.findByIdAndUpdate(req.params.id,req.body);
    if(!updatedInst){
        return next(new AppError('No document found with that ID',404))
    }
    res.status(204).json({
        status: 'success',
        data: {
            updatedInst: null
        }
    })
})

const createInstructor = createOne(Class);
const getAllInstructors = findMany(Class)
const getInstructor = findOne(Class)
const deleteInstructor = deleteOne(Class)


export {createInstructor,getAllInstructors,
    getInstructor,assginCourseToClass,
    deleteInstructor,removeCourse,changeInstructor
}