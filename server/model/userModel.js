const mongoose = require("mongoose");

const userRoleEnum = ["User", "Trainer","Admin"];
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: userRoleEnum,  
        default: "User"
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,  
        ref: "Course"
    }],
    averagePricePerHour: {
        type: Number,
        default: 0
    },
    trainerRating: {
        type: Number, 
        default: 0  
    },
    trainerDescription: {
        type: String,
        default: ""
    }
},{ timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;