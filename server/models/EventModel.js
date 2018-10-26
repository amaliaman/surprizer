const Sequelize = require('sequelize');
const connection = require('../dataAccess/Connection');
const moment = require('moment-timezone');

const mailer = require('../utils/Mailer');

const userModel = require('./UserModel');

class EventModel {
    constructor() {
        this.Event = connection.sequelize.define('event', {
            title: {
                type: Sequelize.STRING,
                notNull: true
            },
            date: {
                type: Sequelize.DATE,
                notNull: true
            },
            chatRoomId: {
                type: Sequelize.INTEGER
            },
        });

        this.EventsUsers = connection.sequelize.define('eventsUsers', {});

        this.setAssociations();
    }

    setAssociations() {
        // Create events_users rel table
        this.Event.belongsToMany(userModel.User, { through: this.EventsUsers });
        userModel.User.belongsToMany(this.Event, { through: this.EventsUsers });

        // Add roleId foreign key to events_users table
        userModel.Role.hasOne(this.EventsUsers);
        this.EventsUsers.belongsTo(userModel.Role);
    }

    // Methods
    async findEventById(id) {
        const event = await this.Event.findById(id);
        return event.get();
    }

    async addUserToEvent(eventId, userId, roleId) {
        return await this.EventsUsers.create({ eventId, userId, roleId });
    };

    async createEvent(title, date, userId, users) {
        // Create event
        const eventResponse = await this.Event.create({ title, date });
        const event = eventResponse.get();

        // Add organizer (roleId = 1)
        await this.addUserToEvent(event.id, userId, 1);

        // Add guests (roleId = 2) and surprisees (roleId = 3)
        for (const roleId of Object.keys(users)) {
            const userEmails = [];
            for (const u of users[roleId]) {
                const type = u.type;
                const conditionObject = { [type]: u[type] };
                const userObject = { [type]: u[type] };
                const user = await userModel.findOrCreateUser(conditionObject, userObject);
                await this.addUserToEvent(event.id, user.id, roleId);

                // Get guests' emails
                if (Number(roleId) === 2 && type === 'email') {
                    userEmails.push({ id: user.id, email: user.email });
                };
            };

            // Send mails
            if (userEmails.length) {
                const date = moment(event.date).format('L HH:mm ZZ');
                const emails = userEmails.map(u =>
                    ({
                        to: u.email,
                        from: `surprizer_${event.id}@surprizer.app`,
                        fromName: 'Surprizer',
                        subject: `Surprizer! You're invited to ${event.title}`,
                        text: `You're invited to ${event.title} on ${event.date}`,
                        html: `<p>
                                Hi there,
                                <br />
                                You're invited to <b>${event.title}</b> on ${date}.
                                <br />
                                You can upload greetings <a href="https://www.surprizer.app/events/${event.id}/${u.id}/greetings">here</a>.
                                <br />
                                See you there!
                            </p>`,
                    })
                );
                mailer.sendMail(emails);
            }
        }


        return event;
    }

    // async updateEvent(eventId, updateObject) {
    //     const event = await this.Event.findById(eventId);
    //     const update = event.update(updateObject);
    //     return update;
    // }

    async findUserRoleByEvent(eventId, userId) {
        const row = await this.EventsUsers.findOne({ where: { eventId, userId } });
        const role = row.getRole();
        return role;
    }

    async findEventsByUser(userId) {
        const user = await userModel.User.findById(userId);
        const events = await user.getEvents();
        return events;
    }
}

const eventModel = new EventModel();
module.exports = eventModel;