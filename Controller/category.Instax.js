import InstaxModel from "../model/instax.model"
import multer from "multer";
import fs from 'fs'
import path from "path";

const storsge = multer.diskStorage({
    destination: function (req, file, cb) {
        if (fs.existsSync('./Avatar')) {
            cb(null, './Avatar');
        } else {
            fs.mkdirSync('./Avatar', true)
            cb(null, './Avatar');
        }
    },

    filename: function (req, file, cb) {
        const imgName = file.originalname;
        const imgArr = imgName.split(".");
        imgArr.pop();
        const extImg = path.extname(imgName);
        const imageName = imgArr.join(".") + "-" + Date.now() + extImg;
        cb(null, imageName);
      
    },
});

const upload = multer({ storage: storsge });

export const getInstaxs = async (req, res) => {
    try {
        const categoryData = await InstaxModel.find({status:1});
        res.status(200).json({
            Data: categoryData,
            message: "Category data Successfully Fatched!",
            path: "http://localhost:8001:/Avatar/",
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }
}

export const getInstax = async (req, res) => {
    try {
        const cateID = req.params.cate_id;
        const subcateData = await InstaxModel.findOne({ _id: cateID });
        res.status(200).json({
            Data: subcateData,
            message: "Successfully Instax-Category Data Fatched! ",
            path:"http://localhost:8001:/Avatar/",
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }
}




export const addInstax = (req, res) => {
    try {
        const uploadFile = upload.single("image");

        uploadFile(req, res,  function (error) {
            if (error) return res.status(400).json({ message: error.message });
            const { name } = req.body;
            let image = "";
            if (req.file !== undefined) {
                image = req.file.filename
            }
            const categoryData = new InstaxModel({
                name: name,
                image: image
            })
            categoryData.save();
            if (categoryData) {
                res.status(201).json({
                    Data: categoryData,
                    message: "Successfully Category Data Add!",                   
                })
            }
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}







export const updateInstax = async (req, res) => {
    try {

        const uploadFile = upload.single("image");

        uploadFile(req, res, async function (error) {
            if (error) return res.status(400).json({ message: error.message });
            const { name } = req.body
            const cateID = req.params.cate_id;

            const categoryData = await InstaxModel.find({ _id: cateID });

            let image = categoryData.image;
            if (req.file !== undefined) {
                image = req.file.filename
                if (fs.existsSync("./Avatar/" + categoryData.image)) {
                    fs.unlinkSync("./Avatar/" + categoryData.image)
                }
            }

            const categoryupdateData = await InstaxModel.updateOne({ _id: cateID }, {
                $set: {
                    name: name,
                    image: image

                }
            })

            if (categoryupdateData) {
                res.status(201).json({
                    Data: categoryData,
                    message: "Successfully Category Data Update!"
                })
            }
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}




export const deleteInstax = async (req, res) => {
    try {
        const cateID = req.params.cate_id;

        const categoryData = await InstaxModel.deleteOne({ _id: cateID });
        if (categoryData.acknowledged) {
            if (fs.existsSync("./upload/" + categoryData.image)) {
                fs.unlinkSync("./upload/" + categoryData.image)
            }

            return res.status(200).json({
                message: "Category data Successfully Delete!"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }
}


export const deleteSoftInstax = async (req, res) => {
    try {
        const cateID = req.params.cate_id;

        const categoryData = await InstaxModel.updateOne({ _id: cateID }, { $set: { status: 0 } });
        if (categoryData.acknowledged) {
            if (fs.existsSync("./upload/" + categoryData.image)) {
                fs.unlinkSync("./upload/" + categoryData.image)
            }

            return res.status(200).json({
                message: "Category data Successfully Delete!"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }
}