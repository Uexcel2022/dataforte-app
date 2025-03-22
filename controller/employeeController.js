import catchAsync from "../utils/catch.js"
import {Employee} from '../models/employeeModel.js'
import AppError from "../utils/AppError.js"
import {search,findMany, createOne, findOne} from './handleFactory.js'





const updateEmployee = catchAsync( async (req,resp,next) => {

        const {name, phoneNumber, country, 
           state, address,salary,gender,
           updatedAt,updatedBy,email,position
         } = req.body;
     
        const updatedValues = {
           name,phoneNumber,country, 
           state, address, salary,gender,
           updatedAt,updatedBy,email,position
        }
     
         const emp = 
         await Employee.findByIdAndUpdate(req.params.id,updatedValues,{new: true, runValidators: true});
         
         if(!emp){
            return next(new AppError('No employee found with that ID',404))
         }
     
         resp.status(200).json({
          status: 'success',
          data: {
             employee: emp
          }
         })
      });

      
const deleteEmployee = catchAsync( async (req,resp,next) => {
    const emp = await Employee.findByIdAndDelete(req.params.id)
    if(!emp){
        return next(new AppError('No employee found with that ID',404))
     }
    resp.status(204).json({
        status: 'success',
        employee: null
    })
})

const getEmployee = findOne(Employee)
const createEmployee = createOne(Employee)
const getAllEmployees = findMany(Employee);
const nameSearch = search(Employee);


export {
    createEmployee,getAllEmployees,
    getEmployee,updateEmployee,
    deleteEmployee,nameSearch
}