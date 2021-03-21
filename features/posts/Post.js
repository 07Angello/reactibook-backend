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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});

PostSchema.virtual('numComments', {
    ref: 'Comment', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: 'post', // is equal to `foreignField`
    count: true // And only get the number of docs
  });

module.exports = model('Post', PostSchema);
