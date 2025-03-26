import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/UserModel.js";
import JWT from "jsonwebtoken";

//register controller
export const registerController = async (req, res) => {
  try {

    const { username, email, password, phone, instituteName } = req.body.formData;
    console.log(username);
    console.log(phone);
    // const { image } = req.file;
    // const imageUrl = req.file.path;
    //validation

    if (!email) {
      return res.send({ error: "email is required" });
    }
    if (!username) {
      return res.send({ error: "username is required" });
    }
    if (!password) {
      return res.send({ error: "password is required" });
    }
    if (!phone) {
      return res.send({ error: "phone no is required" });
    }
    if (!instituteName) {
      return res.send({ error: "institution name  is required" });
    }
    // if(!req.file)
    //     return
    // res.send({error:'Image is required'})

    //check user
    const existingUser = await userModel.findOne({ email });
    //existing user
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already register plese login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    // const imageUrl = `data:${
    //   req.file.mimetype
    // };base64,${req.file.buffer.toString("base64")}`;

    //save
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
      instituteName,
      phone,
      // image: imageUrl,
    });
    res.status(201).send({
      success: true,
      message: "user register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registeration",
      error,
    });
  }
};

//login controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res
        .status(404)
        .send({ success: false, message: "invalid email and password " });
    }

    //check user
    const user = await userModel.findOne({ email });
    //existing user
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "email is not registerd" });
    }
    //compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ success: false, message: "invalid password" });
    }
    //generate token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        username: user.username,
        email: user.email,
        phone: user.phone,
        instituteName: user.instituteName,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eroor in login",
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  res.send("test controller");
};
