import cartModel from "../model/cart.model";
import productModel from "../model/productModel";


export const getCart = async (req, res) => {
  try {
    const userID = req.params.user_id;
    const cartItems = await cartModel.find({ userID: userID });
    if (cartItems) {
      res.status(200).json({
        Data: cartItems,
        message: "cart Items Successfully Fatched!"
      })
    };
  } catch (error) {
    res.status(500).json({
      message: error.message
    })

  }
}

export const addCart = async (req, res) => {
  try {
    const { userID, productID } = req.body;

    const cartItems = await cartModel.findOne({
      userID: userID,
      productID: productID,
    });
    if (cartItems) {
      if (cartItems.quantity == 10) {
        return res.status(400).json({
          message: "Only 10 items allowed.",
        });
      }
      const updatedItem = await cartModel.updateOne(
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
      const prodData = await productModel.findOne({ _id: productID });

      const cartData = new cartModel({
        userID: userID,
        productID: productID,
        name: prodData.name,
        price: prodData.price,
        quantity: 1,
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




export const updateQuantity = async (req, res) => {
  try {
    const cartID = req.params.cart_id;
    const { type } = req.query;

    const cartItem = await cartModel.findOne({ _id: cartID });

    if (cartItem.quantity >= 10 && type === "+") {
      return res.status(400).json({
        message: "Only 10 items allowed.",
      });
    }
    //  console.log(cartItem.quantity)

    if (cartItem.quantity <= 1 && type === "-") {
      const deletedItem = await cartModel.deleteOne({ _id: cartID });
      if (deletedItem.acknowledged) {
        return res.status(200).json({
          message: "Deleted",
        });
      }
    }
    let quantity = cartItem.quantity;
    if (type === "inc") quantity += 1;
    if (type === "desc") quantity -= 1;

    const updatedItem = await cartModel.updateOne(
      { _id: cartID },
      {
        $set: {
          quantity: quantity,
        },
      }
    );

    if (updatedItem.acknowledged) {
      return res.status(200).json({
        message: "Quantity Updated.",
      });
    }

    return res.status(500).json({
      message: "Something went wrong.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const cartID = req.params.cart_id;

    const deletedItem = await cartModel.deleteOne({ _id: cartID })
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

export const deleteCartItembyuser = async (req, res) => {
  try {
    const userID = req.params.user_id;
    const deletedItem = await cartModel.deleteMany({ UserId: userID })
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