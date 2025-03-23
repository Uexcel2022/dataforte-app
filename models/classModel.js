import mongoose from './DBConnection.js';


const classSchema = mongoose.Schema({

    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        require: [true, 'Please provide instruction ID'],
        unique: [true, 'Instructor already assigned to a class.']
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

classSchema.pre(/^find/,function(next){
    this.find({active: {$ne: false}})
    next();
})


const Class = mongoose.model('Class', classSchema);
export {Class}