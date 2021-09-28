const pairRouter = require('express').Router();
const Pair =require('../controller/pair.business_logic');

//rest api's
pairRouter.get('/',(req,res)=>{
    res.send("WELCOME TO CURRENCY EXCHANGE PORTAL")
});

pairRouter.post('/pair-create',Pair.create);

pairRouter.get('/single-pair-read',Pair.getSinglePair);

pairRouter.get('/all-pair-read',Pair.getAllPair);


// pairRouter.put('/update/:_id',Currency.update);

// pairRouter.delete('/delete/:_id',Currency.delete);

module.exports=pairRouter;