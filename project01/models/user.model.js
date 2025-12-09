const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
        },
        gender: {
            type: String,
            required: true,
            enum: ['male', 'female']
        },
        jobTitle: {
            type: String,
            required: true,
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model('User', userSchema);