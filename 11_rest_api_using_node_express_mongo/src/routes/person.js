let express = require('express');
let router = express.Router();

// localhost:3000/person?name=someName&age=26
router.get('/person', (req, res) => {
    if(req.query.name){
        res.send(`u requested this person ---- ${req.query.name} ---- details`)
    }
    else{
        res.send("u requested person");
    }
});

// localhost:3000/person/thomas
router.get('/person/:name', (req, res) => {
    res.send(`u requested this person ---- ${req.params.name} ---- details`);
});

router.get('/error', (req, res) => {
    throw new Error('this is forced error');
});

module.exports = router;