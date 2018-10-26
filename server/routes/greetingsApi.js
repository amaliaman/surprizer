const express = require('express');
const router = express.Router();

// const eventModel = require('../models/EventModel');
const greetingModel = require('../models/GreetingModel');

// Get available greeting types
router.get('/types', async (req, res) => {
    try {
        const types = await greetingModel.getTypes();
        res.json(types);
    }
    catch (err) { throw err; }
});

// Create greeting
router.post('/', async (req, res) => {
    try {
        const grreting = await greetingModel.createGreeting(req.body);
        res.json(grreting);
    }
    catch (err) { throw err; }
});

// Update greeting
router.put('/:greetingId', async (req, res) => {
    try {
        const update = await greetingModel.updateGreeting(req.params.greetingId, req.body);
        res.json(update);
    }
    catch (err) { throw err; }
});

// Delete greeting
router.delete('/:greetingId', async (req, res) => {
    try {
        const del = await greetingModel.deleteGreeting(req.params.greetingId);
        res.json(del);
    }
    catch (err) { throw err; }
});

module.exports = router;