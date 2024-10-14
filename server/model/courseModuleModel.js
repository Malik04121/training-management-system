const mongoose = require("mongoose");

//below schema is for single chapter
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
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category", 
        required: true
    }
},{ timestamps: true });

const CourseModule = mongoose.model("CourseModule", courseModuleSchema);

module.exports = CourseModule;