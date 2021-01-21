// 'Schema' constructor and 'model' function come from the Mongoose library
const { Schema, model } = require('mongoose')
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema({
    pizzaName: {
        type: String,
        required: 'Please enter a name for your pizza.',
        trim: true
    },
    createdBy: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // formats the createAt field using dateFormat() every time a pizza is retrieved
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
        type: String,
        required: true,
        enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
        default: 'Large'
    },
    // one could also specify "Array" as a data "type" in place of the square brackets
    toppings: [],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        // this is a property that Mongoose would return, but it is not needed
        id: false
    }
);

// get total amount of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function () {
    // uses 'reduce()' to tally every comment with its replies; this method takes two parameters, 'accumulator' (= 'total') and 'currentValue' (= 'comment')
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

// create Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;
