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

router.get('/:userId/events', async (req, res) => {
    // allow only logged in users
    try {
        const { userId } = req.params;
        const events = await eventModel.findEventsByUser(userId);
        res.json(events);
    }
    catch (err) { throw err; }
});

module.exports = router;