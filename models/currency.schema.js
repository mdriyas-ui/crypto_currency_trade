const mongoose = require('mongoose')

const currencyModel = mongoose.Schema({
    currency : {
        type : String
    },
    symbol:{
        type : String
    },
    price :{
        type : Number
    },
    volume:{
        type : Number
    },
    status:{
        type: Boolean
    }
    
},{
    timestamps: true
});

module.exports = mongoose.model('Currency',currencyModel);





