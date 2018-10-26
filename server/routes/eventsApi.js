const express = require('express');
const router = express.Router();

const eventModel = require('../models/EventModel');
const greetingModel = require('../models/GreetingModel');

// Get event details (per user permissions)
router.get('/:eventId/:userId', async (req, res) => {
    try {
        // TODO: handle fake eventId & userId
        // security trimmed
        const { eventId, userId } = req.params;
        const event = await eventModel.findEventById(eventId);
        const role = await eventModel.findUserRoleByEvent(eventId, userId);
        const greetings = await greetingModel.getGreetingsByEventTrimmed(eventId, userId);
        res.json({ event, role, greetings });
    }
    catch (err) { throw err; }
});

// Create an event
router.post('/',
    // TODO: only organizers have permissions
    async (req, res) => {
        try {
            const { title, date, userId, users } = req.body;
            const event = await eventModel.createEvent(title, date, userId, users);
            res.json(event);
        }
        catch (err) { throw err; }
    });

// Update event details
// router.put('/:eventId', async (req, res) => {
//     try {
//         const { eventId } = req.params;
//         const event = await eventModel.updateEvent(eventId, req.body);
//         res.json(event);
//     }
//     catch (err) { throw err; }
// });

module.exports = router;