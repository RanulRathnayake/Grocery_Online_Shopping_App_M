const  ProductRepository  = require("../database/repository/product-repository");
const  { FormatData } = require("../utils/Utils");


class ProductService {

    constructor() {
        this.repository = new ProductRepository();
    }

    async CreateProduct(productInputs) {
        try {
            const productResult = await this.repository.CreateProduct(productInputs)
            return FormatData(productResult);
        } catch (err) {
            console.log(err);
        }
    }

    async GetProducts() {
        try {
            const products = await this.repository.Products();

            let categories = {};

            products.map(({ type }) => {
                categories[type] = type;
            });

            return FormatData({
                products,
                categories: Object.keys(categories),
            })

        } catch (err) {
            console.log(err);
        }
    }

    async GetProductDescription(productId) {
        try {
            const product = await this.repository.FindById(productId);
            return FormatData(product)
        } catch (err) {
            console.log(err);
        }
    }

    async GetProductsByCategory(category) {
        try {
            const products = await this.repository.FindByCategory(category);
            return FormatData(products)
        } catch (err) {
            console.log(err);
        }

    }

    async GetSelectedProducts(selectedIds) {
        try {
            const products = await this.repository.FindSelectedProducts(selectedIds);
            return FormatData(products);
        } catch (err) {
            console.log(err);
        }
    }

    async GetProductById(productId) {
        try {
            return await this.repository.FindById(productId);
        } catch (err) {
            console.log(err);
        }
    }

    async GetProducPayload(userId, {productId, qty}, event) {
        const product = await this.repository.FindById(productId);

        if(product) {
            const payload = {
                event: event,
                data: {userId, product, qty}
            }
            return FormatData(payload)
        } else {
            return FormatData({message:'Failed to communicate with other services'})
        }
    }
}

module.exports = ProductService;