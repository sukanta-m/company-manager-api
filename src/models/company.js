const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: String,
    state: String,
    enityType: {
        type: String,
        default: "Corporation"
    },
    planId: {
        type: Number,
        default: 1
    },
    representatives: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Representive'
    }]
}, {
    timestamps: true
});

// companySchema.virtual('representives', {
//     ref: 'Representive',
//     localField: '_id',
//     foreignField: 'representive'
// });

const Company = mongoose.model('Company', companySchema);

module.exports = Company;