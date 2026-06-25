import User from "../models/user_model.js";
import { createUser, userExists } from "../models/user_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import passwordReset from "../models/password_resent_model.js";
import { sendEmail } from "../services/sendMail.js";
import { getResetPasswordHtml } from "../utils/mailUtils.js";

export const register = async (req, res) => {
  try {
    const { name, username, mobile, email, password, designation } = req.body;

    if (!name || !username || !mobile || !email || !password || !designation) {
      return res.status(400).json({
        succes: false,
        messsage: "All Fields are required...",
      });
    }

    const existingUser = await userExists(username, email);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          existingUser.username === username
            ? "Username already exists"
            : "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const saveUser = await createUser({
      name,
      username,
      mobile,
      email,
      password: hashedPassword,
      designation,
    });
    return res.status(200).json({
      success: true,
      messsage: "User regitser successfully...",
      data: saveUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      messsage: error.messsage,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check required fields
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    // Find user
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: "Username not found",
      });
    }

    // Compare password
    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) {
      return res.status(401).json({
        message: "Invalid  password",
      });
    }

    // Generate access token
    const accessToken = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      config.JWT_TOKEN,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
    });

    return res.status(200).json({
      message: "User successfully logged in",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken");

    return res.status(200).json({
      success: "true",
      message: "Logout Sucessfully...",
    });
  } catch (error) {
    return res.status(400).json({
      success: "false",
      message: error.messsage,
    });
  }
};
export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  try {
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate token
    const resetToken = jwt.sign({ id: user._id }, config.JWT_TOKEN, {
      expiresIn: "15m",
    });

    // Delete old tokens
    await passwordReset.deleteMany({
      userID: user._id,
    });

    // Save token
    await passwordReset.create({
      userID: user._id,
      token: resetToken,
    });

    // Create reset link
    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    // Send email
    await sendEmail(
      user.email,
      "Reset Password",
      getResetPasswordHtml(user.username, resetLink),
    );

    res.status(200).json({
      success: true,
      message: "Reset email sent successfully",
      token: resetToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const {password} = req.body;
if(!token || !password){
  return res.status(400).json({
    succes:"false",
    message:"field are requrired"
  })
}

    const decoded = jwt.verify(token, config.JWT_TOKEN);



    // Find user
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
   
    //password new hash
 const hashedPassword = await bcrypt.hash(password, 10);

 //update password
user.password = hashedPassword;

await user.save();

//delete the token 

 const deletedToken =  await passwordReset.findOneAndUpdate(
      { token },
      {
        $set: {
          token: null
        }
      }
    );


    res.status(200).json({
      success: true,
      message: "password updated successfully",
      user,
    });
  } catch (error) {


    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
