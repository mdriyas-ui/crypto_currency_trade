const mongoose = require("mongoose");
const Pair = mongoose.model('Pair');
const Currency = mongoose.model('Currency')



exports.create = async (req, res, next) => {
    try {
        let fromCurrency = await Currency.findOne({
            _id: req.body.from_id
        });

        let toCurrency = await Currency.findOne({
            _id: req.body.to_id
        });

        if (fromCurrency === null || toCurrency === null) {

            fromCurrency === null ? `${res.send(`From_Id    : ${req.body.from_id} is NOT_FOUND`)}` : `${res.send(`To_Id   : ${req.body.to_id} is NOT_FOUND`)}`

        } else {
            let pair_value = `${fromCurrency.symbol}_${toCurrency.symbol}`;
            console.log(pair_value);

            //check the pair currency is active or not
            if (fromCurrency.status === true && toCurrency.status === true) {
                let pair_data = {

                    from_id: req.body.from_id,
                    to_id: req.body.to_id,
                    volume: req.body.volume,
                    status: req.body.status,
                    pair: pair_value
                }

                let pairData = new Pair(pair_data);
                let savedPairData = await pairData.save()
                console.log(savedPairData);
                res.status(200).send(`the given currency details is successfully created : ${savedPairData}`);
            } else {
                console.log(fromCurrency.status === false ?
                    `${toCurrency.status === false ?'Both currency are inactive':`${fromCurrency.symbol}inactive`}` : `${toCurrency.symbol} inactive `);

                // check which currency is inactive
                res.status(404).send(fromCurrency.status === false ?
                    `${toCurrency.status === false ?'Both currency are inactive':`${fromCurrency.symbol}inactive`}` : `${toCurrency.symbol} inactive `)
            }

        }
    } catch (error) {
        next(error);
    }
};


exports.getAllPair = async (req, res, next) => {

    let pairData = await Pair.aggregate([{
            $lookup: {
                from: "currencies",
                localField: "from_id",
                foreignField: "_id",
                as: "from_currency"
            },
        }, {

            $unwind: "$from_currency"

        },
        {
            $lookup: {
                from: "currencies",
                localField: "to_id",
                foreignField: "_id",
                as: "to_currency"
            }
        }, {

            $unwind: "$to_currency"

        }, {
            "$project": {
                "from_currency.symbol": 1,
                "to_currency.symbol": 1,
                "from_currency.status": 1,
                "to_currency.status": 1
            }
        }
    ]);
    console.log("..................................................");
    console.log(pairData);
    res.send(pairData);

};




exports.getSinglePair = async (req, res, next) => {

    let pairData = await Pair.aggregate([{
            $match: {
                pair: req.body.pair
            }
        },
        {
            $lookup: {
                from: "currencies",
                localField: "from_id",
                foreignField: "_id",
                as: "from_currency"
            },
        }, {

            $unwind: "$from_currency"

        },
        {
            $lookup: {
                from: "currencies",
                localField: "to_id",
                foreignField: "_id",
                as: "to_currency"
            }
        }, {

            $unwind: "$to_currency"

        }, {
            "$project": {
                "from_currency.symbol": 1,
                "to_currency.symbol": 1,
                "from_currency.status": 1,
                "to_currency.status": 1
            }
        }
    ]);

    console.log("............................");
    console.log(pairData);
    res.send(pairData);

};