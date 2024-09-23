

const { Error } = require("mongoose");
const axios = require('axios');


module.exports.FormatData = (data) => {
    if (data) {
        return { data };
    } else {
        throw new Error("Data Not Found");
    }
}

module.exports.PublishCustomerEvent = async(payload) => {

    axios.post('http://localhost:8000/customer/app-events', {
        payload
    })
}

module.exports.PublishShoppingEvent = async(payload) => {

    axios.post('http://localhost:8000/shopping/app-events', {
        payload
    })
}


