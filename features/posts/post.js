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
    isEdited: {
        type: Boolean,
        required: true,
        default: false
    },
    creationDate: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

module.exports = model('Post', PostSchema);
