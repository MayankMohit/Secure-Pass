import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        if (!email || !password || !name) {
            throw new Error("All Fields are Required.");
        }
        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
          return res.status(400).json({ success: false, message: "User Already Exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        });
        await user.save();

        generateTokenAndSetCookie(res, user._id);

        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        });
         
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
}

export const login = async (req, res) => {
    res.send("Login Route")
}

export const logout = async (req, res) => {
    res.send("Logout Route")
}