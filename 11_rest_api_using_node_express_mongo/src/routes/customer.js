let express = require('express');
let mongoose = require('mongoose');
let CustomerModel = require('../models/customer.model');
let router = express.Router();

// add customer
router.post('/customer', (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).send('body is missing');
    }
    else {
        // req.body is {}
        // if there is no else below code would execute ie 18 and 21 results --> cant change the status after res sent
        let doc = new CustomerModel(req.body);
        doc.save()
            .then((data) => {
                if (!data || data.length === 0) {
                    res.status(500).send(data);
                }
                res.status(201).send(doc);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    }
});

// read customer
router.get('/customer', (req, res) => {
    if (!req.query.email) {
        res.status(400).send('missing url parameters');
    }
    else {
        console.log(req.query.email);
        CustomerModel.findOne({
            email: req.query.email
        }).then((results) => {
            console.log(results);
            res.status(200).json(results);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    }
});

// update customer
router.put('/customer', (req, res) => {
    if (!req.query.email || !req.body) {
        res.status(400).send('missing --- url parameters or body');
    }
    else{
        CustomerModel
        .findOneAndUpdate({ email: req.query.email }, req.body, { new: true })
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    }
});

// delete customer
router.delete('/customer', (req, res) => {
    if (!req.query.email) {
        res.status(400).send('missing --- url parameters');
    }
    else{
        CustomerModel
        .findOneAndRemove({ email: req.query.email })
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    }
});

module.exports = router;