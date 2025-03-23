import catchAync from '../utils/catch.js'
import {Admin} from '../models/adminstrators.js'
import AppError from '../utils/AppError.js'
import {createOne, findMany, findOne} from './handleFactory.js'

const createAdmin = createOne(Admin)
const getAllAdins = findMany(Admin)
const getAdmin = findOne(Admin)
 

 const getMe = catchAync(async(req,resp,next)=>{
   const admin = await Admin.findById(req.admin._id).select('-role')
   if(!admin){
      return next(new AppError('No admin found with that ID',404))
   }
   resp.status(200).json({
      status: 'success',
      data: {
         admin
      }
   })
 });

 const updateAdmin = catchAync(async(req,resp,next)=>{
   const {name, phoneNumber, country, 
      state, address,salary,gender,
      updatedAt,updatedBy
    } = req.body;

   const updatedValues = {
      name,phoneNumber,country, 
      state, address, salary,gender,
      updatedAt,updatedBy
   }

    const updatedAdmin = 
    await Admin.findByIdAndUpdate(req.params.id,updatedValues,{new: true, runValidators: true});
    
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



 const updateAdminPassword = catchAync(async(req,resp,next)=>{

   const {oldPassword, newPassword, confirmPassword, updatedAt,updatedBy} = req.body;

   if(!req.params.id && !req.admin){
      return next(new AppError('Expected ID value not present!',400));
   }

   const id = req.params.id ? req.params.id : req.admin._id 

   if(newPassword !== confirmPassword){
      return next(new AppError('Passwords are not the same!',400));
   }
   const admin = await Admin.findById(id).select('+password')

   if(!admin){
      return next(new AppError('Admin not found with that ID!',400));
   }

   if(!req.params.id){
      if(!await admin.correctPassword(oldPassword, admin.password)){
         return next(new AppError('Invalid password!',400));
      }
   }

   const updatedValues = {
     newPassword,updatedAt,updatedBy, confirmPassword
   }
   admin.password = updatedValues.newPassword
   admin.updatedAt = updatedValues.updatedAt
   admin.updatedBy = updatedValues.updatedBy
   admin.confirmPassword = updatedValues.confirmPassword;
   admin.passwordChangedAt = Date.now();
   admin.save();

    resp.status(200).json({
     status: 'success',
     message: 'Password updated successfully.'
   });
})


 const deleteAdmin = catchAync(async(req,resp,next)=>{

   const toDeletAdmin = 
   await Admin.findByIdAndUpdate(req.params.id,{active: false}).select('+active')
   
   if(!toDeletAdmin){
      return next(new AppError('Admin not found with that ID!',400));
   }
    resp.status(200).json({
      status: 'success',
      message: "Admin deativated successfully" 
    })
 })


export  {
   createAdmin,getAllAdins,
   getAdmin,updateAdmin,getMe,
   deleteAdmin,updateAdminPassword
}

