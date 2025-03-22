import catchAsync from "../utils/catch.js"
import AppError from '../utils/AppError.js'
import {Student} from '../models/studentModel.js'
import {search,findMany, createOne, findOne, deleteOne} from '../controller/handleFactory.js'


const updatetudent =  catchAsync(async(req,resp,next)=>{
    const {name, phoneNumber, country, 
       state, address,salary,gender,stack,
       updatedAt,updatedBy,email,courseTitle,
     } = req.body;
 
    const updatedValues = {
       name,phoneNumber,country,email,
       state, address, salary,gender,stack,
       courseTitle,updatedAt,updatedBy
    }
 
     const updatedAdmin = 
     await Student.findByIdAndUpdate(req.params.id,updatedValues,{new: true, runValidators: true});
     
     if(!updatedAdmin){
        return next(new AppError('No admin found with that ID',404))
     }
     resp.status(200).json({
      status: 'success',
      data: {
         admin: updatedAdmin
      }
     })
  });

  const assignStudentToCourse = catchAsync(async(req,resp,next)=>{
    const updatedAt = req.body.updatedAt;
    const updatedBy = req.body.updatedBy
    req.body.updatedBy = undefined;
    req.body.updatedAt = undefined;
    const student = 
    await Student.findByIdAndUpdate(req.params.id,{$addToSet: req.body,updatedAt,updatedBy},{new: true})

    if(!student){
        return navigator('No instructor with the ID',404)
    }
    resp.status(200).json({
        status: 'success',
        data: {
            student
        }
    })
})

const removeCourse = catchAsync(async(req,resp,next)=>{
    const student = await Student.findById(req.params.id);
    if(!student){
        return next(new AppError('No student found with that ID',404))
    }
    const toRemoveCourses = req.body.courses;
    const courses = await JSON.parse(JSON.stringify(student.courses));
     const updatedCourses = await courses.filter(el=>!toRemoveCourses.includes(el))
     student.courses=updatedCourses
     student.save();
    resp.status(200).json({
        status: 'success',
        data: {
            student
        }
    })
})



const createStudent = createOne(Student);
const getStudent = findOne(Student)
const nameSearch = search(Student);
const getAllStudents = findMany(Student);
const delateStudent = deleteOne(Student)

export {
    createStudent,getAllStudents,getStudent,removeCourse,
    updatetudent,delateStudent,assignStudentToCourse,nameSearch
}