const { Error } = require("mongoose");
const axios = require('axios');

const  APP_SECRET  = "RgRjygihfqaa";

module.exports.ValidateSignature = async (req) => {
    try {
      const signature = req.get("Authorization");
      console.log(signature);
      const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
      req.user = payload;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
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





