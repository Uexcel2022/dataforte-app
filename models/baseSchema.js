import validator from 'validator';
import mongoose from 'mongoose';

const  baseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please provide your name.'],
        minlength: [3,'Name must be at least 3 characters.'],
        maxlength: [30,'Name must not exceed 30 characters.'],
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[A-Za-z]+ [A-Za-z]+ ?[A-Za-z]*$/.test(v);
            },
            message: 'Name must consist of only alphabets.'
        }
    },
    email: {
        type: String,
        unique: [true, 'The email has been used.'],
        required: [true, 'Please provide your email.'],
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },

    phoneNumber: {
        type: String,
        required: [true,'Please provide your phone number.'],
        unique: [true, 'The phone number has been used. Please provide another phone number.'],
        validate: {
            validator: function (v) {
                return /^0[7-9][10][0-9]{8}$/.test(v);
            },
            message: 'Please provide a valid phone number.'
        }
    },

    gender:{
        type: String,
        required: [true,'Please provide your gender.'],
        lowercase: true,
        enum: {
            values: ['male','female'],
            message: 'Gender must be male or female.'
        }
    },
    
    address: {
        type: String,
        required: [true,'Please provide your address.'],
        trim: true,
        maxlength: [100,'Address must not exceed 100 characters.'],
        minlength: [10,'Address must be at least 10 characters.'],
        lowercase: true
    },

    state: {
        type: String,
        required: [true,'Please provide your state.'],
        trim: true,
        maxlength: [30,'State must not exceed 30 characters.'],
        minlength: [3,'State must be at least 3 characters.'],
        lowercase: true
    },

    country: {
        type: String,
        required: [true,'Please provide your country.'],
        trim: true,
        maxlength: [30,'Country must not exceed 30 characters.'],
        minlength: [3,'Country must be at least 3 characters.'],
        lowercase: true
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
    active: {
        type: Boolean,
        default: true
    }
}, 
{discriminatorKey: 'Kind'});

// baseSchema.pre('/^find/', function(next){
//     this.find({active: {$ne: false}});
//     next();
// });

const BaseModel = mongoose.model('Dataforte-Documents',baseSchema);

export {BaseModel}