const eventModel = require('../models/EventModel');
const greetingModel = require('../models/GreetingModel');
const userModel = require('../models/UserModel');

const initTables = async (populate) => {
    try {
        await userModel.Role.sync({ force: true });
        await userModel.User.sync({ force: true });

        await eventModel.Event.sync({ force: true });
        await eventModel.EventsUsers.sync({ force: true });

        await greetingModel.Type.sync({ force: true });
        await greetingModel.Greeting.sync({ force: true });

        addTypes();
        addRoles();

        if (populate) {
            await populateTables();
        }
    }
    catch (error) { throw error; }
};

const addRoles = async () => {
    try {
        await userModel.Role.bulkCreate([
            { title: 'organizer' },
            { title: 'guest' },
            { title: 'surprisee' }
        ]);
    }
    catch (error) { throw error; }
};

const addTypes = async () => {
    try {
        await greetingModel.Type.bulkCreate([
            { type: 'inline' },
            { type: 'image' },
            { type: 'audio' },
            { type: 'video' },
            { type: 'file' }
        ]);
    }
    catch (error) { throw error; }
};

const _addEvent = (title, date) => {
    return eventModel.Event.create({ title, date });
};

const _addUser = (name, isRegistered, email, phone, password) => {
    return userModel.User.create({ name, isRegistered, email, phone, password });
};

const _addRole = async (eventId, userId, roleId) => {
    const row = await eventModel.EventsUsers.findOne({ where: { eventId: eventId, userId: userId } });
    return row.update({ roleId: roleId });
};

const _addGreeting = (eventId, userId, typeId, isPrivate, filePath, text) => {
    return greetingModel.Greeting.create({ eventId, userId, typeId, isPrivate, filePath, text });
};

const populateTables = async () => {
    try {
        // Create users
        const user1 = await _addUser('Ami', true, 'amalia@a.b', null, '123');
        const user2 = await _addUser('Moshe', true, 'moshe@a.b', null, '456');
        const user3 = await _addUser(null, false, 'moshe@a.b', null, null);

        // Create events
        const event1 = await _addEvent('Hunter\'s Bar Mitzvah', new Date());
        const event2 = await _addEvent('Retirement party', new Date());

        // Add users to events
        await event1.addUser(user1);
        await event1.addUser(user2);
        await event2.addUser(user2);

        // Assign roles
        await _addRole(1, 1, 2);
        await _addRole(1, 2, 3);
        await _addRole(2, 2, 1);

        // Create greetings
        await _addGreeting(1, 1, 1, true, null, 'hi there');
        await _addGreeting(1, 2, 1, false, null, 'wow');
        await _addGreeting(2, 2, 1, false, null, 'greetings from Earth');
    }
    catch (error) { throw error; }
};

module.exports = initTables;