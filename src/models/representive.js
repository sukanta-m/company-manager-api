const mongoose = require('mongoose');

const representiveSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: String
}, {
    timestamps: true
});

const Representive = mongoose.model('Representive', representiveSchema);

module.exports = Representive;