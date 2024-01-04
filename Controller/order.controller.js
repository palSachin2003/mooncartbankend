import orderModel from "../model/order.model";


export const getOrder = async (req, res) => {
    const orderData = await orderModel.find({ status: 1 });
    try {
        res.status(200).json({
            data: orderData,
            message: 'Order Data SuccessFully FAtched !'
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }
}


export const addOrder = (req, res) => {
    totalPayment: {
        const { firstName, lastName, address, email, zipcode, phone, paymentMethod, userId, totalItems, totalPayment,city,state,country,cartItems,statuss } = req.body
        try {

            const userOrder = new orderModel({
                firstName: firstName,
                lastName: lastName,
                email: email,
                address: address,
                city:city,
                state:state,
                phone: phone,
                country:country,
                zipcode: zipcode,
                paymentMethod: paymentMethod,
                userId: userId,
                totalItems: totalItems,
                totalPayment: totalPayment,
                cartItems: cartItems,
                statuss:statuss
            });
            userOrder.save();
            if (userOrder) {
                res.status(200).json({
                    data: userOrder,
                    message: 'Order Data SuccessFully FAtched !'
                })
            }
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}