// 'Schema' constructor and 'model' function come from the Mongoose library
const { Schema, model } = require('mongoose')

const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    size: {
        type: String,
        default: 'Large'
    },
    // one could also specify "Array" as a data "type" in place of the square brackets
    toppings: []
});

// create Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;
