const  CustomerRepository  = require('../database/repository/customer-repository.js');
const { FormatData, GenerateSignature, ValidatePassword, GeneratePassword, GenerateSalt } = require('../utils/Utils.js');
const { Error } = require('mongoose');

class CustomerService {

    constructor() {
        this.repository = new CustomerRepository();
    }

    async SignIn(userInputs) {

        const { email, password } = userInputs;

        try {
            const existingCustomer = await this.repository.FindCustomer({ email });

            if (existingCustomer) {
                const validPassword = await ValidatePassword(password, existingCustomer.password, existingCustomer.salt);

                if (validPassword) {
                    const token = await GenerateSignature({ email: existingCustomer.email, _id: existingCustomer._id });
                    return FormatData({ id: existingCustomer._id, token });
                }
            }
            return FormatData({ success: false, message: 'Email did not exists' })
        } catch (err) {
            console.log(err)
        }
    }

    async SignUp(userInputs) {
        const { email, password, phone } = userInputs;

        try {
            const existingEmail = await this.repository.FindCustomer({email});
            if (existingEmail) {
                console.log("Email alreadt exists")
                //throw new Error('Email already exists'); 
                return FormatData({ success: false, message: 'Email already exists' });
            } else{

            let salt = await GenerateSalt();

            let userPassword = await GeneratePassword(password, salt);

            const existingCustomer = await this.repository.createCustomer({ email, password: userPassword, phone, salt });

            const token = await GenerateSignature({ email: email, _id: existingCustomer._id });

            return FormatData({ id: existingCustomer._id, token });
            }

        } catch (error) {
            console.log(error)
        }
    }

    /* async GetCustomerByEmail(email) {
        return await this.repository.FindCustomer( email );
    } */

    async GetProfile(id) {
        try {
            const existingCustomer = await this.repository.FindCustomerById({ id });
            return FormatData(existingCustomer);

        } catch (err) {
            console.log(err)
        }
    }
    
    async AddNewAddress(_id,userInputs){
        
        const { street, postalCode, city,country} = userInputs;
        
        try {
            const addressResult = await this.repository.CreateAddress({ _id, street, postalCode, city,country})
            return FormatData(addressResult);
            
        } catch (err) {
            console.log(err);
        } 
        
    
    }

    async GetShopingDetails(id){

        try {
            const existingCustomer = await this.repository.FindCustomerById({id});
    
            if(existingCustomer){
               return FormatData(existingCustomer);
            }       
            return FormatData({ msg: 'Error'});
            
        } catch (err) {
            console.log(err);        }
    }

    async GetWishList(customerId){

        try {
            const wishListItems = await this.repository.Wishlist(customerId);
            return FormatData(wishListItems);
        } catch (err) {
            console.log(err);        }
    }

    async AddToWishlist(customerId, product){
        try {
            const wishlistResult = await this.repository.AddWishlistItem(customerId, product);        
           return FormatData(wishlistResult);
    
        } catch (err) {
            console.log(err);        }
    }

    async ManageCart(customerId, product, qty, isRemove){
        try {
            const cartResult = await this.repository.AddCartItem(customerId, product, qty, isRemove);        
            return FormatData(cartResult);
        } catch (err) {
            console.log(err);        }
    }

    async ManageOrder(customerId, order){
        try {
            const orderResult = await this.repository.AddOrderToProfile(customerId, order);
            return FormatData(orderResult);
        } catch (err) {
            console.log(err);        }
    }

    async SubscribeEvents(payload){
 
        const { data, event } =  payload;

        const { userId, product, order, qty } = data;

        switch(event){
            case 'ADD_TO_WISHLIST':
            case 'REMOVE_FROM_WISHLIST':
                this.AddToWishlist(userId,product)
                break;
            case 'ADD_TO_CART':
                this.ManageCart(userId,product, qty, false);
                break;
            case 'REMOVE_FROM_CART':
                this.ManageCart(userId,product,qty, true);
                break;
            case 'CREATE_ORDER':
                this.ManageOrder(userId,order);
                break;
            case 'TEST':
                console.log("It's working");
            default:
                break;
        }
 
    }

}

module.exports = CustomerService;
