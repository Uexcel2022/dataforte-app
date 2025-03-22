import mongoose from './DBConnection.js';


const instructorSchema = mongoose.Schema({

    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        require: [true, 'Please provide instruction ID']
    },
    
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            require: [true, 'Please provide course(s)']
        }
    ],

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
    active: {
        type: Boolean,
        default: true
    }
    
})

instructorSchema.pre(/^find/,function(next){
    this.find().select('-__v')
    next();
})


const Class = mongoose.model('Class', instructorSchema);
export {Class}