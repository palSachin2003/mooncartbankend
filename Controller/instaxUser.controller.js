import multer, { diskStorage } from 'multer'
import fs from 'fs'
import path from 'path'
import bcrypt from "bcrypt";
import userModel from '../model/instaxUser.model';
import nodemailer from 'nodemailer'
import { verify } from 'crypto';
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';






export const getInstaxUsers = async (req, res) => {
    try {
        const userData = await userModel.find({ status: 1 });
        res.status(200).json({
            data: userData,
            message: "Successfully Data Fatched!",
            path: "http://localhost:8001/Image"

        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }
}


export const getInstaxUser = async (req, res) => {
    try {
        const userID = req.params.user_id;
        const userData = await userModel.findOne({ _id: userID });
        res.status(200).json({
            data: userData,
            message: "Successfully Data Fatched!",
            path: "http://localhost:8001/Image"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }
}



export const addInstaxUser = (req, res) => {
    try {
        const { fullName, userName, email, password, } = req.body;

        const userData = new userModel({
            fullName: fullName,
            userName: userName,
            email: email,
            password: password,
        });
        userData.save();

        if (userData) {
            res.status(201).json({
                data: userData,
                message: "Successfully Data Added!"
            })
        }


    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }
}



export const updateInstaxUser = async (req, res) => {
    try {

        const userID = req.params.user_id;
        const { fullName, userName, email, password, } = req.body;

        const userData = await userModel.find({ _id: userID })

        const updateUser = new userModel.updateOne({ _id: userID }, {
            $set: {
                fullName: fullName,
                userName: userName,
                email: email,
                password: password,
            }
        });

        if (updateUser.ackonwledged) {
            return res.status(200).json({
                data: userData,
                message: "Successfully Data update!"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }
}


export const userInstaxDelete = async (req, res) => {
    try {
        const userID = req.params.user_id;
        const userData = await userModel.deleteOne({ _id: userID });

        if (userData.acknowledged) {
            return res.status(200).json({
                message: "UaerData Deleted"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const userInstaxSoftDelete = async (req, res) => {
    try {
        const userID = req.params.user_id;
        const userData = await userModel.updateOne({ _id: userID }, { $set: { status: 0 } });

        if (userData.acknowledged) {
            return res.status(200).json({
                message: "UaerData Deleted Your Device "
            })
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



// =========================== Sing In =========================

export const register = async (req, res) => {
    try {
        const { fullName, userName, email, password } = req.body;

        const getUserData = await userModel.findOne({ email: email });
        if (getUserData) {
            return res.status(200).json({
                // data: getUserData,
                message: "User already exist"
            })
        }
        const newPassword = bcrypt.hashSync(password, 10);
        const userData = new userModel({
            fullName: fullName,
            userName: userName,
            email: email,
            password: newPassword
        });
        userData.save();
        if (userData) {
            return res.status(200).json({
                data: userData,
                message: "successfully Signed up !"
            });
        };
    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await userModel.findOne({ email: email });

        if (!userData) {
            return res.status(400).json({
                message: "user doesn't exist !"
            })
        }
        const matchPassword = bcrypt.compareSync(password, userData.password);
        if (!matchPassword) {
            return res.status(400).json({
                message: "Password doesn't match!"
            })
        }
        const token = Jwt.sign(
            { userid: userData._id, email: userData.email },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            token: token,
            data: userData,
            message: "Successfully Sing-in"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }
}


