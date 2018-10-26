const express = require('express');
const router = express.Router();
const Chatkit = require('pusher-chatkit-server');

const eventModel = require('../models/EventModel');
const chatkit = new Chatkit.default({
    instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
    key: process.env.CHATKIT_KEY,
});

router.post('/users', (req, res) => {
    const { username } = req.body
    chatkit
        .createUser({
            id: username,
            name: username
        })
        .then(() => res.sendStatus(201))
        .catch(error => {
            if (error.error_type === 'services/chatkit/user_already_exists') {
                res.sendStatus(200)
            } else {
                res.status(error.status).json(error)
            }
        })
})

router.post('/authenticate', (req, res) => {
    const authData = chatkit.authenticate({ userId: req.query.user_id })
    res.status(authData.status).send(authData.body);
})

router.post('/rooms', async (req, res) => {
    const { eventId } = req.body;
    chatkit
        .createRoom({
            creatorId: 'surprizer',
            name: `event_${eventId}`
        })
        .then(async room => {
            // save in DB - chat room id
            await eventModel.updateEvent(eventId, { chatRoomId: room.id });
            res.json(room.id);
        })
        .catch((err) => {
            throw err;
        });
})

module.exports = router;