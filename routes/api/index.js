const router = require('express').Router();
const pizzaRoutes = require('./pizza-routes');

// adds '/pizzas' prefix to routes created in `pizza-routes.js`
router.use('/pizzas', pizzaRoutes);

module.exports = router;