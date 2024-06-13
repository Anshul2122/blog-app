//importing packages
const bcrypt = require("bcrypt");

//importing functions from other files
const userModel = require("../models/userModel");


//get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        return res.status(200).send({
            userCount: users.length,
            success: true,
            message: "all users data",
            users,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'error in getAllUsers callback',
            success: false,
            error
        })
    }
    
};
//createuser register user
exports.registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        //validation
        if (!username || !email || !password) { 
            return res.status(400).send({
                message: 'fill all feilds'
            });
        }
        //if existing user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) { 
            return res.status(401).send({
                success: false,
                message: 'user already exists'
            });
        }
        //password hashing
        const hashedPassword = await bcrypt.hash(password, 10);

        //save new user
        const user = new userModel({ username, email,password: hashedPassword });
        await user.save();
        return res.status(201).send({
            success: true,
            message: 'new user created',
            user,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'error in register callback',
            success: false,
            error
        })
    }
 };

//login
exports.loginController = async (req, res) => {
    try {
        //getting the input fro the password
        const { email, password } = req.body;
        //validation
        if (!email || !password) { 
            return res.status(400).send({
                message: 'fill all feilds'
            });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(200).send({
                success: false,
                message: "invalid email id",
            })
        }
        //checking password if user is register
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) { 
            return res.status(401).send({
                success: false,
                message:'invalid password'
            })
        }
        return res.status(200).send({
            success: true,
            message: "login sucessfully",
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "error in login callback",
            success: false,
            error
        })
    }
};