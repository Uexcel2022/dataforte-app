import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catch.js";
import { Admin } from "../models/adminstrators.js";
import jwt from 'jsonwebtoken'
import {promisify} from 'util'


const protect = catchAsync(async(req,res,next)=>{
  let token;
  
  if(req.headers.authorization && `${req.headers.authorization}`.startsWith('Bearer') ){
    token = `${req.headers.authorization}`.split(' ')[1]
  }
  if(!token){
    return next(new AppError('You are not logged in. Please login..',401))
  }

  const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
  

  const adminUser = await Admin.findById(decoded.id).select('+passwordChangedAt')

  if(!adminUser){
    return next(new AppError('The admin associated with this token does not exist any more.',401))
  }
     if(await adminUser.checkPasswordChange(decoded.iat)){
        return next(new AppError('You changed password recently. Please login again.',401))
     }
   
   req.admin = adminUser

  next();

})


const restrictTo = (...roles)=>{
     return catchAsync(async(req,res,next)=>{
        const adminRole =  req.admin.role;
          if(!roles.includes(adminRole)){
           return next(new AppError('You do not have permission to perform this action.',403))
        }
        next()
     })
}





const login = catchAsync(async(req,res, next)=>{
   const {email,password} = req.body;
   if(!email || !password){
    return next(new AppError('Please provide email and password to login',400))
   }
   
   const adminUser = await Admin.findOne({email}).select('+password');

   if(!adminUser||!await adminUser.correctPassword(password,adminUser.password)){
     return next(new AppError('Invalid username or password'));
   }

   const token = await promisify(jwt.sign)({id: adminUser._id}, process.env.JWT_SECRET, {
       expiresIn: process.env.JWT_EXPIRES_IN
   })

   res.status(200).json({
    token,
    data:{
        name : adminUser.name
    }
   })
})




export {login,protect,restrictTo}