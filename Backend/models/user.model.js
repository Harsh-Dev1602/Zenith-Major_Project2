import mongoose from "mongoose";

const journalSchema = mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    mood: {
        type: String,
        required: true,
    },
    moodScore: {
        type: Number,
        required: true,
    },
},{ timestamps: true });

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    journal : [journalSchema]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;