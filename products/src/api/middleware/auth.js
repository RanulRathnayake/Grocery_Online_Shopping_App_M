const { ValidateSignature } = require('../../utils/Utils');

module.exports = async (req,res,next) => {
    
    const isAuthorized = await ValidateSignature(req);

    if(isAuthorized){
        return next();
    }else {
        return res.status(403).json({message: 'Not Authorized'})
    }
}