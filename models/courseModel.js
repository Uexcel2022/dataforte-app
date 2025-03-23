
import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        lowercase: true,
        required: [true,'Please provide course name.'],
        minlength: [3,'Name must be at least 3 characters.'],
        maxlength: [30,'Name must not exceed 30 characters.'],
        unique : [true, 'Course exists'],
        trim: true,
    },

    category: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true,'Please provide course category.'],
        enum: {
           values : ['software development', 'product managment', 'cyber security','data analysis'],
           message: 'course categeries: software, product managment, cyber security and data analysis'
        }
    },

    price: {
        type: Number,
        trim: true,
        required: [true, "Pleas provide course price."],
        min: [35000, 'Price must not be less than 35000']
    },

      createdAt: {
        type: Date,
        select: false
    },
    createdBy: {
        type: String,
        select: false
    },

    updatedAt: {
        type: Date,
        select: false
    },
    updatedBy: {
        type: String,
        select: false
    },
    
})

courseSchema.pre(/^find/,function(next){
    this.find({active: {$ne: false}}).select('-__v')
    next();
})

const Course = mongoose.model('Course', courseSchema);

export {Course}