const express = require('express');
const Company = require('../models/company');
const Representive = require('../models/representive');
const auth = require('../middleware/auth');
const { companyCreateSchema } = require("../validators/company");
const router = new express.Router();

router.post('/companies', auth, async (req, res) => {
    const { error, value } = companyCreateSchema.validate(req.body);
    if (error) {
        console.log(error)
        return res.send(500);
    }
    const {representatives} = value;
    let representiveDocs = [];

    try {
        if (representatives) {
            representiveDocs = await Representive.insertMany(representatives);
        }
        delete req.body.representatives;
        const company = new Company({
            ...req.body,
            representatives: representiveDocs.map(doc => doc._id)
        });
        await company.save();
        company.representatives = representiveDocs;
        res.status(201).send(company);
    } catch (e) {
        console.log(e.message)
        res.status(400).send(e);
    }
});

router.get('/companies', auth, async (req, res) => {
    try {
        const companies = await Company.find({}).populate('representatives');
        res.send(companies);
    } catch (e) {
        console.log(e)
        res.status(500).send(e);
    }
});

router.get('/companies/:id', auth, async (req, res) => {
    try {
        const company = await Company.findOne({_id: req.params.id}).populate('representatives');
        if (!company) {
            return res.status(404).send();
        }
        res.send(company);
    } catch (e) {
        res.status(500).send();
    }
})

router.patch('/companies/:id', auth, async (req, res) => {
    const {representatives} = req.body;
    let representiveDocs = [];
    try {
        if (representatives) {
            representiveDocs = await Representive.insertMany(representatives);
        }
        delete req.body.representatives;
        const company = await Company.findOne({_id: req.params.id}).populate('representatives');

        if (!company) {
            return res.status(404).send();
        }
        await company.update({
            ...req.body,
            representatives: [...company.representatives, representiveDocs.map(r => r._id)]
        });
        company.representatives = [...company.representatives, ...representiveDocs];
        res.send(company);
    } catch (e) {
        res.status(400).send();
    }
})

router.delete('/companies/:id', auth, async (req, res) => {
    try {
        const company = await Company.findOneAndDelete({ _id: req.params.id });

        if (!company) {
            return res.status(404).send();
        }
        res.send(company);
    } catch (e) {
        console.log(e)
        res.status(500).send(e);
    }
})

module.exports = router;