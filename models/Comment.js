// the 'Type' object contains data used in teh replyId property
const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const replySchema = new Schema({
    // sets custom id to avoid confusion with parent comment _id
    replyId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    replyBody: {
        type: String
    },
    writtenBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
},
    {
        toJSON: {
            getters: true
        }
    }

)

const commentSchema = new Schema({
    writtenBy: {
        type: String
    },
    commentBody: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    // replies will be nested directly within comment's document, rather than being referred to
    replies: [replySchema]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

commentSchema.virtual('replyCount').get(function() {
    return this.replies.length
})

const Comment = model('Comment', commentSchema);

module.exports = Comment;