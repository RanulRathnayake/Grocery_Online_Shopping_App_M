const { ProductRepository } = require("../database/repository/product-repository");
const { FormateData } = require("../utils/Utils");


class ProductService {

    constructor() {
        this.repository = new ProductRepository();
    }

    async CreateProduct(productInputs) {
        try {
            const productResult = await this.repository.CreateProduct(productInputs)
            return FormateData(productResult);
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

            return FormateData({
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
            return FormateData(product)
        } catch (err) {
            console.log(err);
        }
    }

    async GetProductsByCategory(category) {
        try {
            const products = await this.repository.FindByCategory(category);
            return FormateData(products)
        } catch (err) {
            console.log(err);
        }

    }

    async GetSelectedProducts(selectedIds) {
        try {
            const products = await this.repository.FindSelectedProducts(selectedIds);
            return FormateData(products);
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

}

module.exports = ProductService;