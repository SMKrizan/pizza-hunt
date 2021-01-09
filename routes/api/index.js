const router = require('express').Router();
const pizzaRoutes = require('./pizza-routes');
const commentRoutes = require('./comment-routes');

// adds '/pizzas' prefix to routes created in `pizza-routes.js`
router.use('/pizzas', pizzaRoutes);

// adds '/comments' prefix to routes created in `comment-routes.js`
router.use('/comments', commentRoutes);

module.exports = router;