import instaxItemModel from '../model/instaxProduct.Model';
import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (fs.existsSync("./uploads")) {
      cb(null, "./uploads");
    } else {
      fs.mkdirSync("./uploads", true);
      cb(null, "./uploads");
    }
  },

  filename: function (req, file, cb) {
    const imgname = file.originalname;
    const imgarr = imgname.split(".");
    imgarr.pop();
    const imgExt = path.extname(imgname);
    const fname = imgarr.join(".") + "-" + Date.now() + imgExt;
    cb(null, fname);
  },
});

const upload = multer({ storage: storage });

export const getInstaxItems = async (req, res) => {
  try {
    const productData = await instaxItemModel.find({ status: 1 }).populate('categoryID');
    res.status(200).json({
      data: productData,
      message: "Successfully data fatched!",
      path: "http://localhost:8001/uploads/"
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })

  }
}



export const getInstaxItem = async (req, res) => {
  try {
    const productID = req.params.product_id
    const productData = await instaxItemModel.findOne({ _id: productID }).populate('categoryID');
    res.status(200).json({
      data: productData,
      message: "Successfully data fatched By ID !",
      path: "http://localhost:8001/uploads/"
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })

  }
}



export const addInstaxItem = (req, res) => {
  try {
    const uploadFile = upload.array("images", 10);

    uploadFile(req, res, function (err) {
      if (err)
        return res.status(400).json({
          message: err.message,
        });
      const { title, tag, categoryID, price, discount, color, disTitle, description, shortdisTitle, shortdescription } = req.body;

      let imageArr = [];

      console.log(req.files);
      if (req.files != undefined) {
        for (let i = 0; i < req.files.length; i++) {
          const element = req.files[i];
          imageArr.push(element.filename);
        }
      }

      console.log(imageArr);

      const productData = new instaxItemModel({
        title: title,
        tag: tag,
        categoryID: categoryID,
        price: price,
        discount: discount,
        color: color,
        disTitle: disTitle,
        description: description,
        shortdisTitle: shortdisTitle,
        shortdescription: shortdescription,
        images: imageArr,
      });
      productData.save();
      if (productData) {
        res.status(201).json({
          data: productData,
          message: "add successfully",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}


export const updateInstaxItem = async (req, res) => {
  try {
    const uploadFile = upload.single("avatar");
    uploadFile(req, res, async function (err) {
      if (err)
        return res.status(400).json({
          message: err.message,
        });
      const productID = req.params.product_id;
      const { title, tag, categoryID, price, discount, color, disTitle, description, shortdisTitle, shortdescription } = req.body;
      const productData = await instaxItemModel.findOne({ _id: productID });
      let image = productData.avatar;
      if (req.file !== undefined) {
        image = req.file.filename;
        if (fs.existsSync("./uploads/" + productData.avatar)) {
          fs.unlinkSync("./uploads/" + productData.avatar);
        }
      }
      const productdata = await instaxItemModel.updateOne(
        { _id: productID },
        {
          $set: {
            title: title,
            tag: tag,
            categoryID: categoryID,
            price: price,
            discount: discount,
            color: color,
            disTitle: disTitle,
            description: description,
            shortdisTitle: shortdisTitle,
            shortdescription: shortdescription,
            images: imageArr,
          },
        }
      );
      if (productdata.acknowledged) {
        res.status(200).json({
          message: "data updated successfully",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



export const deleteInstaxItem = async (req, res) => {
  try {
    const productID = req.params.product_id;
    const productData = await instaxItemModel.deleteOne({ _id: productID });
    if (productData.acknowledged) {
      // if (fs.existsSync("./uploads/" + data.avatar)) {
      //   fs.unlinkSync("./uploads/" + data.avatar);
      // }
      res.status(200).json({
        message: "data deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const softDeleteInstaxItem = async (req, res) => {
  try {
    const productID = req.params.product_id;
    const productData = await instaxItemModel.updateOne(
      { _id: productID },
      { $set: { status: 0 } }
    );
    if (productData.acknowledged) {
      res.status(200).json({
        message: "data deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};