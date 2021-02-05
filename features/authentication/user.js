const { model, Schema } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String
    },
    coverPhoto: {
        type: String
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true
});

module.exports = model('User', UserSchema);
