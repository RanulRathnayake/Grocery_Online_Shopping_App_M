const ShoppingRepository = require("../database");
const { FormatData } = require("../utils");

class ShoppingService {

    constructor() {
        this.repository = new ShoppingRepository();
    }

    async GetCart({ _id }) {
        try {
            const cartItems = await this.repository.Cart(_id);

            return FormatData(cartItems)
        } catch (err) {
            console.log(err);
        }
    }

    async PlaceOrder(userInputs) {
        const { _id, txnNumber } = userInputs;

        try {
            const orderResult = await this.repository.CreateNewOrder(_id, txnNumber);
            return FormatData(orderResult);
        } catch (err) {
            console.log(err);
        }
    }

    async GetOrders(customerId) {
        try {
            const orders = await this.repository.Orders(customerId);
            return FormatData(orders);
        } catch (err) {
            console.log(err);
        }
    }

    async ManageCart(customerId, item, qty, isRemove) {
        try {
            const cartResult = await this.repository.AddCartItem(customerId, item, qty, isRemove);

            return FormatData(cartResult)
        } catch(err) {
            console.log(err);
        }
    }

    async SubscribeEvents(payload){
 
        const { event, data } =  payload;

        const { userId, product, order, qty } = data;

        switch(event){
            
            case 'ADD_TO_CART':
                this.ManageCart(userId,product, qty, false);
                break;
            case 'REMOVE_FROM_CART':
                this.ManageCart(userId,product,qty, true);
                break;
            default:
                break;
        }
 
    }

    async GetOrderPayload(userId, order, event) {

        if(order) {
            const payload = {
                event: event,
                data: {userId, order}
            }
            return FormatData(payload)
        } else {
            return FormatData({message:'No order is available'})
        }
    }
}

module.exports = ShoppingService;
