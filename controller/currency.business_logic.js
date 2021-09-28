const mongoose = require("mongoose");
const Currency = mongoose.model('Currency');



exports.create = async (req, res, next) => {
    try {
        let currency_data = {
            
            currency: req.body.currency,
            symbol: req.body.symbol,
            price: req.body.price,
            volume: req.body.volume,
            status:req.body.status
        }
        
        let currencyData = new Currency(currency_data);
        let savedCurrencyData = await currencyData.save()
        console.log(savedCurrencyData);
        res.status(200).send(`the given currency details is successfully created : ${savedCurrencyData}`);

    } catch (error) {
        next(error);
    }
};