const { ProductModel } = require("../models");

class ProductRepository {
    async CreateProduct({
        name,
        desc,
        type,
        banner,
        unit,
        price,
        available,
        suplier
    }) {
        try {
            const product = new ProductModel({
                name,
                desc,
                type,
                banner,
                unit,
                price,
                available,
                suplier
            });

            const productResult = await product.save();
            return productResult;
        } catch (err) {
            console.log(err);
        }
    }

    async Products() {
        try {
            return await ProductModel.find();
        } catch (err) {
            console.log(err);
        }
    }

    async FindById(id) {
        try {
            return await ProductModel.findById(id);
        } catch (err) {
            console.log(err);
        }
    }

    async FindByCategory(category) {
        try {
            const products = await ProductModel.find({ type: category });
            return products;
        } catch (err) {
            console.log(err);
        }
    }

    async FindSelectedProducts(selectedIds) {
        try {
            const products = await ProductModel.find()
                .where("_id")
                .in(selectedIds.map((_id) => _id))
                .exec();
            return products;
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = ProductRepository;