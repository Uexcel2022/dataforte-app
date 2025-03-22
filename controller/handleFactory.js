import { Model } from "mongoose"
import catchAsync from "../utils/catch.js"
import { ApIFeatures } from "../utils/features.js"
import AppError from "../utils/AppError.js"


const createOne = Model=> catchAsync(async(req,res,next)=>{
    const doc = await Model.create(req.body)
    res.status(201).json({
        status: 'success',
          data: {
             doc
          }
        }
    )
})

const search = Model=>catchAsync(async(req,res,next)=>{
     const objName = Object.keys(req.body)
     const regexStr = req.body.name? req.body.name : req.body.courseName

     let docs;
     const regex = new RegExp(regexStr,'i')

     if(objName=='name'){
       docs  = await Model.find({name : regex})
       .sort('name').populate({path: 'courses', strictPopulate:false})
     }
     if(objName=='courseName'){
        docs  = await Model.find({courseName : regex})
       .sort('name').populate({path: 'courses', strictPopulate:false})
     }

    res.status(200).json({
        status: 'success',
        data:{
            docs
        }
    })
})


const findMany = Model => catchAsync(async(req,res,next)=>{
    const features = new ApIFeatures(Model.find(),req.query)
    .filter().sort().fields().paginition()
    const docs = await features.query
    res.status(200).json({
        status: 'success',
        results: docs.length,
        data: {
            docs
        }
    })
})

const findOne = Model => catchAsync(async(req,res,next)=>{
    const doc = await Model.findById(req.params.id)
    .populate({path: 'courses instructor', strictPopulate:false, select: 'name courseName'});
    
    if(!doc){
        return next(new AppError('No document found with that ID',404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            doc
        }
    })
})

const deleteOne = Model => catchAsync(async(req,res,next)=>{
    const doc = await Model.findByIdAndDelete(req.params.id)
    
    if(!doc){
        return next(new AppError('No document found with that ID',404))
    }
    res.status(204).json({
        status: 'success',
        data: {
            doc: null
        }
    })
})


export {search,findMany,findOne,createOne,deleteOne}