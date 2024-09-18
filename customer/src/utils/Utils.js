const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Error } = require("mongoose");

const  APP_SECRET  = "RgRjygihfqaa";

module.exports.GeneratePassword = async (password, salt) =>{
    return await bcrypt.hash(password, salt);
}

module.exports.ValidatePassword = async (
    enteredPassword,
    savedPassword,
    salt
) => {
    return (await this.GeneratePassword(enteredPassword, salt) === savedPassword)
}

module.exports.FormatData = (data) => {
    if (data) {
        return { data };
    } else {
        throw new Error("Data Not Found");
    }
}

module.exports.GenerateSignature = async(payload) =>{
    try{
        return await jwt.sign(payload, APP_SECRET, { expiresIn: "30d"});
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports.GenerateSalt = async () => {
    return await bcrypt.genSalt();
  };