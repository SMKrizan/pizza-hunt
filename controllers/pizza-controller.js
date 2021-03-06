const { Pizza } = require('../models');

const pizzaController = {
    // callback function for GET /api/pizzas route
    getAllPizza (req, res) {
        Pizza.find({})
        .populate({
            path: 'comments',
            // indicates that we do not want the '_v' field returned
            select: '-__v'
        })
        .select('-__v')
        // will sort results in descending order by id value
        .sort({ _id: -1 })
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // destructuring params from req instead of returning entire req
    getPizzaById ({ params }, res) {
        // callback for GET /api/pizzas/:id
        Pizza.findOne({ _id: params.id })
        .populate({
            path: 'comments',
            select: '-__v'
        })
        .select('-__v')
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(400).json({ message: "No pizza found with this id!" });
                return
            }
            res.json(dbPizzaData);
        })
        .catch(err => {
            consol.log(err);
            res.status(400).json(err);
        });
    },

    // callback for POST /api/pizzas
    createPizza ({ body }, res) {
        // destructuring body from req object
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.status(400).json(err));
    },

    // callback for PUT /api/pizzas/:id
    updatePizza ({ params, body }, res) {
        // instructing Mongoose to return the new version of the document (it would otherwise return the original doc); in addition, runValidators indicates that any new information needs to be validated using settings found in the models(?)
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(400).json({ message: 'No pizza found with this id' });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    },

    // callback for DELETE /api/pizzas/:id
    deletePizza ({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(400).json({ message: 'No pizza with this id was found.' });
                    return
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    }

}

module.exports = pizzaController;