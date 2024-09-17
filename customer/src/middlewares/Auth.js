const bcrypt = require("bcrypt");
const { Error } = require("mongoose");


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