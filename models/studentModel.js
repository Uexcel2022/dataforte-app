import mongoose from 'mongoose';
import {BaseModel} from "./baseSchema.js"

const studentSchema = new mongoose.Schema({

    courseTitle: {
        type: String,
        required: [true,'Please provide course tile.'],
        minlength: [3,'course title must be at least 3 characters.'],
        maxlength: [30,'course title must not exceed 30 characters.'],
        trim: true,
        lowercase: true,
        enum: {
          type: String,
          values: ['software development','cyber security','data analysis','project management'],
          message: 'Options: software development, cyber security, data analysis, project management'
        }
    },

    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        }
    ],
    
    stack: {
        type: String,
        lowercase: true,
        trim: true,
    },

    lectureStatus: {
        type: String,
        default: 'not started',
        enum: {
            values: ['not started','pause','in progress','completed'],
            message: 'Options: not started, pause in progress, completed'
        }
    },
})

// studentSchema.pre('save', async function(next){
//     if(!this.isModified('password')||this.isNew) return next();

//     this.passwordChangedAt = Date.now() - 1000;
//     next();
// })

studentSchema.pre(/^find/, async function(next){
    this.find({active: {$ne: false}})
    next();
})


const Student = BaseModel.discriminator('Student',studentSchema)

export {Student}