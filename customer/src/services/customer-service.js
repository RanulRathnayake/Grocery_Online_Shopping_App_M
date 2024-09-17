const {CustomerRepository} = require('./customer-repository');


class CustomerService {

    constructor(){
        this.repsitory = new CustomerRepository();
    }

    async SignIn(userInputs){

        const {email, password} = userInputs;

        try{
            const existingCustomer = await this.repsitory.Findcutomer({email});

            if(existingCustomer){
                const validPassword = await validPassword(password, existingCustomer.password, existingCustomer.salt);

                if(validPassword){
                    const token = await GenerateSignature({email: existingCustomer.email, _id: existingCustomer._id});
                    return FormateData({id: existingCustomer._id, token});
                }
            }
            return FormateData(null)
        } catch(err){
            console.log(err)
        }
    }
}