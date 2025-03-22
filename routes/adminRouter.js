import {createAdmin,getAdmin,getAllAdins,
    deleteAdmin,updateAdmin,updateAdminPassword,getMe
} from '../controller/adminController.js'
import {createdAt,updatedAt} from '../middleware/audit.js'
import {login,protect,restrictTo} from '../controller/authController.js'

import express from 'express'

const adminRouter = express.Router();

adminRouter.post('/auth',login)

adminRouter.use(protect);

adminRouter.patch('/password/me',updatedAt,updateAdminPassword)
adminRouter.get('/me',getMe)

adminRouter.use(restrictTo('mgr','super-admin'))

adminRouter.route('/:id').get(getAdmin)
.put(updatedAt,updateAdmin).patch(updatedAt,deleteAdmin);

adminRouter.route('/')
.post(createdAt,createAdmin).get(getAllAdins);

adminRouter.patch('/password/:id',updatedAt,updateAdminPassword);


export {adminRouter}