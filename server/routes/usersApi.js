const express = require('express');
const router = express.Router();

const userModel = require('../models/UserModel');
const eventModel = require('../models/EventModel');

// Get user details
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userModel.findUserById(userId);
        res.json(user);
    }
    catch (err) { throw err; }
});

// Get a single user's events
router.get('/:userId/events', async (req, res) => {
    // allow only logged in users
    try {
        const { userId } = req.params;
        const events = await eventModel.findEventsByUser(userId);
        res.json(events);
    }
    catch (err) { throw err; }
});

// Update user details
router.put('/:userId', async (req, res) => {
    try {
        const update = await userModel.updateUser(req.params.userId, req.body);
        res.json(update);
    }
    catch (err) { throw err; }
});

module.exports = router;