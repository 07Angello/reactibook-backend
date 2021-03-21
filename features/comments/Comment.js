const { model, Schema } = require('mongoose');

const CommentSchema = Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    isEdited: {
        type: Boolean,
        required: true,
        default: false
    },
    creationDate: {
        type: String
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

module.exports = model('Comment', CommentSchema);
