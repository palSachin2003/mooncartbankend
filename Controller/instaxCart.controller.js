
import instaxCartModel from "../model/instaxCart.model";
import instaxItemModel from "../model/instaxProduct.Model";


export const getInstaxCart = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const cartItems = await instaxCartModel.find({ userID: userId });
    if (cartItems) {
      res.status(200).json({
        Data: cartItems,
        message: "cart InstaxItems Successfully Fatched!"
      })
    };
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}


export const addInstaxCart = async (req, res) => {
  try {
    const { userID, productID, } = req.body;

    const cartItems = await instaxCartModel.findOne({
      userID: userID,
      productID: productID,
    });
    if (cartItems) {
      if (cartItems.quantity == 10) {
        return res.status(400).json({
          message: "Only 10 items allowed.",
        });
      }
      const updatedItem = await instaxCartModel.updateOne(
        { _id: cartItems._id },
        {
          $set: {
            quantity: cartItems.quantity + 1,
          },
        }
      );
      if (updatedItem.acknowledged) {
        res.status(200).json({
          message: "updated",
        });
      }
    } else {
    const prodData = await instaxItemModel.findOne({ _id: productID });
    console.log(prodData)
    const cartData = new instaxCartModel({
      userID: userID,
      productID: productID,
      title: prodData.title,
      price: prodData.price,
      quantity: 1,
      color: prodData.color,
      discount:prodData.discount,
      image: prodData.images[0],

    });
    cartData.save();
    if (cartData) {
      res.status(201).json({
        data: cartData,
        message: "Successfully added to cart!",
      });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const deleteCartItembyInstaxuser = async (req, res) => {
  try {
    // const cartID = req.params.cart_id;
    const userID = req.params.user_id;

    const deletedItem = await instaxCartModel.deleteMany({ UserId: userID })
    if (deletedItem.acknowledged) {
      return res.status(200).json({
        message: "Deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};