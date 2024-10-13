const mongoose = require("mongoose");

const courseModuleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    moduleNumber: {
        type: Number,
        required: true
    },
    moduleDuration: {
        type: Number,
        required: true
    },
    moduleContent: [
        {
            name: {
                type: String,
                required: true
            },
            duration: {
                type: Number,  
                required: true
            }
        }
    ],
    course:{
        type:mongoose.Types.ObjectId,
        ref:"Course"
    }
},{ timestamps: true });

const CourseModule = mongoose.model("CourseModule", courseModuleSchema);

module.exports = CourseModule;