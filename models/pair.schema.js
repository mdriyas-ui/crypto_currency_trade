const { string } = require('joi');
const mongoose = require('mongoose')

const pairModel = mongoose.Schema({
    from_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Currency'
    }],
    to_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Currency'
    }],
    volume: {
        type: Number
    },
    status: {
        type: Boolean
    },
    pair:{
        type :String,
        unique : true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Pair', pairModel);