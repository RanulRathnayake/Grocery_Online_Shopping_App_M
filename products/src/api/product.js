
const ProductService = require('../services/product-service');
const { PublishCustomerEvent, PublishShoppingEvent } = require('../utils/Utils');
const UserAuth = require('./middleware/auth');

module.exports = (app) => {

    const service = new ProductService();

    app.post('/create', async (req, res, next) => {

        try {
            const { name, desc, type, banner, unit, price, available, suplier } = req.body;
            
            const { data } = await service.CreateProduct({ name, desc, type, banner, unit, price, available, suplier });
            return res.json(data);

        } catch (err) {
            console.log(err);
        }

    });

    app.get('/category/:type', async (req, res, next) => {

        const type = req.params.type;

        try {
            const { data } = await service.GetProductsByCategory(type)
            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }

    });

    app.get('/:id', async (req, res, next) => { 

        const productId = req.params.id;

        try {
            const { data } = await service.GetProductDescription(productId);
            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }

    });

    app.post('/ids', async (req, res, next) => {

        try {
            const { ids } = req.body;
            const products = await service.GetSelectedProducts(ids);
            return res.status(200).json(products);

        } catch (err) {
            next(err)
        }

    });

    app.get('/', async (req,res,next) => {
        
        try {
            const { data} = await service.GetProducts();        
            return res.status(200).json(data);
        } catch (error) {
            next(err)
        }
        
    });

    app.put('/wishlist', async (req, res, next) => {

         /* const { _id } = req.user; */
        try {
            //const { data } = await service.GetProducPayload({userId: req.body.user, productId: req.body.id, qty:req.body.qty }, 'ADD_TO_WISHLIST');
            const { data } = {userId: req.body.user, productId: req.body.id, qty:req.body.qty ,event:req.body.event};
             console.log("called", data);
            PublishCustomerEvent(data);
            return res.status(200).json(data.data);
        } catch (err) {
            console.log(err);
        }
    });

    app.delete('/wishlist/:id', UserAuth, async (req, res, next) => {

        const { _id } = req.user;
        const productId = req.params.id;

        try {
            const { data } = service.GetProducPayload(_id, { productId }, 'REMOVE_FROM_WISHLIST');
            PublishCustomerEvent(data);
            return res.status(200).json(data.data.product);
        } catch (err) {
            console.log(err);
        }
    });

    app.put('/cart', UserAuth, async (req, res, next) => {

        const { _id } = req.user;

        try {
            const { data } = service.GetProducPayload(_id, { productId: req.body._id, qty: req.body.qty }, 'ADD_TO_CART');

            PublishCustomerEvent(data);
            PublishShoppingEvent(data);
            const response = {
                product: data.data.product,
                unit: data.data.qty
            }
            return res.status(200).json(response);
        } catch (err) {
            console.log(err);
        }
    });

    app.delete('/cart/:id', UserAuth, async (req, res, next) => {

        const { _id } = req.user;
        const productId = req.params.id;


        try {
            const { data } = service.GetProducPayload(_id, { productId }, 'REMOVE_FROM_CART');

            PublishCustomerEvent(data); 
            PublishShoppingEvent(data);

            return res.status(200).json(data.data.product);
        } catch (err) {
            console.log(err);
        }
    });
}