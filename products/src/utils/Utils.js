const { Error } = require("mongoose");

module.exports.FormatData = (data) => {
    if (data) {
        return { data };
    } else {
        throw new Error("Data Not Found");
    }
}

module.exports.PublishCustomerEvent = async(payload) => {

}

module.exports.PublishShoppingEvent = async(payload) => {
    
}