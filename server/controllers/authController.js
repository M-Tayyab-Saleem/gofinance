import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserModels.js";
import transporter from "../config/nodemailer.js";

export const register = async (req, res) => {
  const { name, email, password, role} = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role
    });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const mailOptions = {
      from: process.env.GMAIL,
      to: email,
      subject: `Welcome To GoFinance.`,
      text: `Welcome To GoFinance App. Your Account Has Been Created with email id: ${email}`,
    };
    await transporter.sendMail(mailOptions);

    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ success: true, message: "User logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    res.status(200).json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendVerifyOTP = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (user.isAccountVerified) {
      return res.status(400).json({ message: "Account already verified" });
    }
    const OTP = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyOTP = OTP;
    user.verifyOTPEpireAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    await user.save();

    const mailOptions = {
      from: process.env.GMAIL,
      to: user.email,
      subject: `Account Verification OTP.`,
      text: `Your OTP for Account Verification is ${OTP}. Verify your account within 24 hours.`,
    };
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "OTP sent on email successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    if (!userId || !otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    if (user.isAccountVerified) {
      return res.status(400).json({ message: "Account already verified" });
    }

    if (user.verifyOTP !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.verifyOTPExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired. Generate new OTP" });
    }
    user.isAccountVerified = true;
    user.verifyOTP = "";
    user.verifyOTPExpires = 0;
    await user.save();

    res.status(200).json({success: true, message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const isAuthenticated = async (req, res) => {
  try {
    res.status(200).json({ success: true, isAuthenticated: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Send Password Reset OTP
export const sendResetOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const OTP = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOTP = OTP;
    user.resetOTPExpireAt = Date.now() + 15 * 60 * 1000; // 24 hours

    await user.save();

    const mailOptions = {
      from: process.env.GMAIL,
      to: user.email,
      subject: `Password Reset OTP.`,
      text: `Your OTP for reseting your password is ${OTP}. Use this OTP to reset your password `,
    };
    await transporter.sendMail(mailOptions);
    return res
      .status(200)
      .json({success: true, message: "Reset OTP sent on email successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reset User Password
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res
      .status(400)
      .json({ message: "Eamil, OTP and new password is required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    if (user.resetOTP !== otp || user.resetOTP === "") {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (user.resetOTPExpireAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired. Generate new OTP" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOTP = "";
    user.resetOTPExpireAt = 0;
    await user.save();
    return res.status(200).json({success: true, message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
