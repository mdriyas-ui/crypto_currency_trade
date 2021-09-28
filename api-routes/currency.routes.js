const currencyRouter = require('express').Router();
const Currency =require('../controller/currency.business_logic')
//rest api's
currencyRouter.get('/',(req,res)=>{
    res.send("WELCOME TO CURRENCY EXCHANGE PORTAL")
});

currencyRouter.post('/currency-create',Currency.create);

// currencyRouter.get('/read',Currency.read);

// currencyRouter.put('/update/:_id',Currency.update);

// currencyRouter.delete('/delete/:_id',Currency.delete);

module.exports=currencyRouter;