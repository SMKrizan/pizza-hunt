const router = require('express').Router();

const {
    addComment,
    removeComment,
    addReply,
    removeReply
} = require('../../controllers/comment-controller');

// Set up comment POST route at /api/comments/:pizzaId
router
    .route('/:pizzaId')
    .post(addComment);

// Set up reply PUT route at /api/comments/:pizzaId/:commentId
router
    .route('/:pizzaId/:commentId')
    .put(addReply)

// Set up comment DELETE route at /api/comments/:pizzaId/:commentId    
router
    .route('/:pizzaId/:commentId')
    .delete(removeComment);

// Set up reply DELETE route at /api/comments/:pizzaId/:commentId/:replyId
router
    .route('/:pizzaId/:commentId/:replyId')
    .delete(removeReply);

module.exports = router;