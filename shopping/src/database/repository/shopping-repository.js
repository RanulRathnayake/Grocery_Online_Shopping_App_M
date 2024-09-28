const { OrderModel, CartModel } = require('../models');
const { v4: uuidv4 } = require('uuid');

class ShoppingRepository {

    async Orders(customerId) {
        try {
            const orders = await OrderModel.find({ customerId });
            return orders;
        } catch (err) {
            console.log(err);
        }
    }

    async Cart(customerId) {
        try {
            const cartItems = await CartModel.find({ customerId });
            return cartItems;
        } catch (err) {
            console.log(err);
        }
    }

    async AddCartItem(customerId, item, qty, isRemove) {

        try {
            const cart = await CartModel.findOne({ customerId });

            const { _id } = item;

            if (cart) {
                let isExist = false;
                let cartItem = cart.items

                if (cartItem.length > 0) {
                    cartItem.map(item => {
                        if (item.product._id.toString() === _id.toString()) {
                            if (isRemove) {
                                cartItems.splice(cartItems.indexOf(item), 1);
                            } else {
                                item.unit = qty;
                            }
                            isExist = true;
                        }
                    });
                }

                if (isExist && isRemove) {
                    cartItem.push({ product: { ...item }, unit: qty });
                }
                cart.items = cartItems;

                return await cart.save();
            } else {
                return await CartModel.create({
                    customerId,
                    items: [{ product: { ...item }, unit: qty }]
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    async CreateNewOrder(customerId, txnId) {



        const cart = await CartModel.findOne({ customerId: customerId })

        if (cart) {

            let amount = 0;

            let cartItems = cart.items;

            if (cartItems.length > 0) {

                cartItems.map(item => {
                    amount += parseInt(item.product.price) * parseInt(item.unit);
                });

                const orderId = uuidv4();

                const order = new OrderModel({
                    orderId,
                    customerId,
                    amount,
                    txnId,
                    status: 'received',
                    items: cartItems
                })

                cart.items = [];

                const orderResult = await order.save();
                await cart.save();
                return orderResult;
            }
        }
        return {}
    }
}

module.exports = ShoppingRepository;