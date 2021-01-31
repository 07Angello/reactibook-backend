const { model, Schema } = require('mongoose');

const PostSchema = Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    filter: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

module.exports = model('Post', PostSchema);