const router = require('express').Router();
const { 
    getAllPizza,
    getPizzaById,
    createPizza,
    updatePizza,
    deletePizza
} = require('../../controllers/pizza-controller');

// instead of creating duplicate routes for individual HTTP methods, they can be combined

// Set up GET all and POST at /api/pizzas
router
    .route('/')
    .get(getAllPizza)
    .post(createPizza);

//  Set up GET one, PUT and DELETE at /api/pizzas/:id
router
    .route('/:id')
    .get(getPizzaById)
    .put(createPizza)
    .delete(deletePizza);

    module.exports = router;