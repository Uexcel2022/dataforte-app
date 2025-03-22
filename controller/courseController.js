import catchAync from '../utils/catch.js'
import {Course} from '../models/courseModel.js'
import {search,findMany, findOne, createOne} from './handleFactory.js'
import AppError from '../utils/AppError.js';



 const updateCourse = catchAync(async(req,resp,next)=>{
   const course = await Course
   .findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
   if(!course){
      return next(new AppError('No course found with that ID',404))
   }
    resp.status(200).json({
       status: 'success',
       data:{
         course
       }
    })
 });

 const createCourse = createOne(Course)
 const getAllCourses =  findMany(Course);
 const searchName = search(Course);
 const getCourse = findOne(Course)


export {
   createCourse,getAllCourses,
   getCourse,updateCourse,searchName
}