const router = require('express').Router();

const {
    addComment,
    removeComment,
    addReply,
    removeReply
} = require('../../controllers/comment-controller');

// Set up POST route at /api/comments/:pizzaId
router
    .route('/:pizzaId')
    .post(addComment);

// Set up POST route at /api/comments/:pizzaId/:commentId
router
    .route('/:pizzaId/:commentId')
    .put(addReply)
    .delete(removeComment);

// Set up DELETE route at /api/comments/:pizzaId/:commentId    
router
    .route('/:pizzaId/:commentId')
    .delete(removeComment);

// Set up DELETE route at /api/comments/:pizzaId/:commentId/:replyId
router
    .route('/:pizzId/:commentId/:replyId')
    .delete(removeReply);

module.exports = router;