import {createEmployee,deleteEmployee,
    getAllEmployees,getEmployee,updateEmployee,nameSearch} 
    from '../controller/employeeController.js'

import {protect,restrictTo} from '../controller/authController.js'
import {createdAt,updatedAt} from '../middleware/audit.js'

import express from 'express'
import {adminRouter} from './adminRouter.js'
const employeeRouter = express.Router();

employeeRouter.use('/admin', adminRouter);

employeeRouter.use(protect,restrictTo('admin','super-admin'))

employeeRouter.route('/')
.post(createdAt,createEmployee).get(getAllEmployees);


employeeRouter.route('/:id').get(getEmployee)
.patch(updatedAt,updateEmployee).delete(deleteEmployee);

employeeRouter.post('/search',nameSearch)


export {employeeRouter}