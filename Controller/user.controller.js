import multer, { diskStorage } from 'multer'
import fs from 'fs'
import path from 'path'
import bcrypt from "bcrypt";
import userModel from '../model/user.model';
import nodemailer from 'nodemailer'
import { verify } from 'crypto';
import Jwt  from 'jsonwebtoken';
import dotenv from 'dotenv';



const storsge = multer.diskStorage({
    destination: function (req, file, cb) {
        if (fs.existsSync('./upload')) {
            cb(null, './upload');
        } else {
            fs.mkdirSync('./upload', true)
            cb(null, './upload');
        }
    },

    filename: function (req, file, cb) {
        const imgname = file.originalname;
        const imgArr = imgname.split(".");
        imgArr.pop();
        const imageExt = path.extname(imgname);
        const imgName = imgArr.join(".") + "_" + Date.now() + imageExt;
        console.log(imgName);
        cb(null, imgName)
    }
});

const upload = multer({ storage: storsge });

export const getUsers = async (req, res) => {
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


export const getUser = async (req, res) => {
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



export const addUser = (req, res) => {
    try {
        const uploadFile = upload.single("avatar");

        uploadFile(req, res, async function (error) {
            if (error) return res.status(400).json({ message: error.message });

            const { fullName, userName, email, password, contact, otp, role } = req.body;

            let image = "";
            if (req.file !== undefined) {
                image = req.file.filename;
            }

            const userData = new userModel({
                fullName: fullName,
                userName: userName,
                email: email,
                password: password,
                contact: contact,
                otp: otp,
                role: role,
                avatar: image,
            });
            userData.save();

            if (userData) {
                res.status(201).json({
                    data: userData,
                    message: "Successfully Data Added!"
                })
            }
        })


    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }
}



export const updateUser = async (req, res) => {
    try {
        const uploadFile = Image.single("avatar");
        uploadFile(req, res, async function (error) {
            if (error) return res.status(400).json({ message: error.message });

            const userID = req.params.user_id;
            const { fullName, userName, email, password, contact, otp, role } = req.body;

            const userData = await userModel.find({ _id: userID })

            let image = userData.avatar;
            if (req.file !== undefined) {
                image = req.file.filename;
                if (fs.existsSync('./Images' + userData.avatar)) {
                    fs.unlinkSync('./Images', + userData.avatar)
                    // cb(null, './Images');
                }
            }
            const updateUser = new userModel.updateOne({ _id: userID }, {
                $set: {
                    fullName: fullName,
                    userName: userName,
                    email: email,
                    password: password,
                    contact: contact,
                    otp: otp,
                    role: role,
                    avatar: image,
                }
            });

            if (updateUser.ackonwledged) {
                return res.status(200).json({
                    data: userData,
                    message: "Successfully Data update!"
                })
            }
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }
}


export const userDelete = async (req, res) => {
    try {
        const userID = req.params.user_id;
        const userData = await userModel.deleteOne({ _id: userID });

        if (userData.acknowledged) {
            if (fs.existsSync('./Images' + userData.avatar)) {
                fs.unlinkSync('./Images', + userData.avatar)
            }

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

export const userSoftDelete = async (req, res) => {
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

export const singUp = async (req, res) => {
    try {
        const { fullName, userName, email, password } = req.body;

        // const rgx = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;

        // const emailRex = rgx(email);
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
        // const token = Jwt.sign(         
        //     { userid: userData._id, email: userData.email },
        //     process.env.SECRET_KEY,
        //     { expiresIn: "1h" }
        // );

        if (userData) {
            return res.status(200).json({
                // token:token,
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

export const singIn = async (req, res) => {
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
        // console.log(token);
        
        return res.status(200).json({
            token:token,
            data: userData,
            message: "Successfully Sing-in"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }
}



// =========================== Sing In OTP =========================


//===============================OTP SEND ===========================
export const genotp = async (req, res) => {
    try {
        const { email, } = req.body;
        const otp = Math.floor(Math.random() * 10000);
        console.log(otp);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'palshachin8090@gmail.com',
                pass: 'uorlksygewnjqcmg'// 
            }
        });

        // Email content
        const mailOptions = {
            from: 'palshachin8090@gmail.com',
            to: "soshrey99@gmail.com",
            subject: 'OTP for Sign Up',
            text: `Your OTP for signing up is: ${otp}`
        };
        const getUSER = await userModel.findOne({ emiail: email })
        if (getUser) {
            const getUSER = await userModel.updateOne({ email: email }, { $set: { otp: otp } })

        }

        // Send the email
        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({
                    message: 'Failed to send OTP via email'
                });
            } else {
                console.log('Email sent:', info.response);

                return res.status(200).json({

                    message: 'Successfully OTP Send! Check your email for OTP verification.'
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// ===============================  verify OTP ====================


export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const userData = await userModel.findOne({ email: email, otp: otp });

        if (!userData) {
            res.status(404).json({
                message: "User Not Exits!"
            });
        }

        if (userData) {
            res.status(404).json({
                data: userData,
                message: "Login Successfully!"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

