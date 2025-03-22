import mongoose from 'mongoose'
import {BaseModel} from './baseSchema.js'


const  employeeSchema = new mongoose.Schema({

    position: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Provide postion'],
        enum: {
            values: ['instructor','cansellor','supervisor','security','chief security','lead instructor'],
            message: 'Position must be instructor,cansellor, supervisor,security, chief security, or lead instructor'
        }
    },

    salary: {
        type: Number,
        required: [true, "Pleas provide the employee salary!"],
        min: [70000, 'Salary must not be less than 70000']
    },
    
})

employeeSchema.pre(/find/, async function(next){
    this.find().select('-__v');
    next();
})


const Employee = BaseModel.discriminator('Employee', employeeSchema);

export {Employee}