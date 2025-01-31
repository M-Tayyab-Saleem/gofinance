import e from "express";
import mongoose from "mongoose";

const userShema = new mongoose.Schema({ 
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    verifyOTP: { type: String, default: '' },
    verifyOTPEpireAt: { type: Number, default: 0},
    isAccountVerified: { type: Boolean, default: false },
    resetOTP: { type: String, default: '' },
    resetOTPEpireAt: { type: Number, default: 0 },
});

const User = mongoose.model.user || mongoose.model('User', userShema);
export default User;