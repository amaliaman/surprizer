const Sequelize = require('sequelize');
const connection = require('../dataAccess/Connection');
const Op = Sequelize.Op;

const eventModel = require('./EventModel');
const userModel = require('./UserModel');

class GreetingModel {
    constructor() {
        this.Greeting = connection.sequelize.define('greeting', {
            isPrivate: {
                type: Sequelize.BOOLEAN,
                notNull: true
            },
            text: {
                type: Sequelize.TEXT,
                notNull: true
            },
            filePath: {
                type: Sequelize.STRING
            }
        });

        this.Type = connection.sequelize.define('type', {
            type: {
                type: Sequelize.STRING,
                notNull: true
            }
        });

        this.setAssociations();
    }

    setAssociations() {
        // Add typeId foreign key to greetings table
        this.Type.hasOne(this.Greeting);
        this.Greeting.belongsTo(this.Type);

        // Add userId foreign key to greetings table
        userModel.User.hasOne(this.Greeting);
        this.Greeting.belongsTo(userModel.User);

        // Add eventId foreign key to greetings table
        eventModel.Event.hasOne(this.Greeting);
        this.Greeting.belongsTo(eventModel.Event);
    }

    // Methods
    async getGreetingsByEventTrimmed(eventIdArg, userIdArg) {
        // Return all for surprisee, or just own if it's a guest/organizer
        const greetings = this.Greeting.findAll({
            where: {
                [Op.and]: [
                    { eventId: eventIdArg }, {
                        [Op.or]: [
                            { isPrivate: false }, {
                                [Op.and]: [
                                    { isPrivate: true }, {
                                        [Op.or]: [
                                            { userId: userIdArg },
                                            eventModel.isUserSurprisee(eventIdArg, userIdArg)
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            include: [userModel.User]
        });
        return greetings.map(g => g.get());
    };

    async updateGreeting(greetingId, updateObject) {
        const greeting = await this.Greeting.findById(greetingId);
        const update = greeting.update(updateObject);
        return update;
    }

    async deleteGreeting(greetingId) {
        const greeting = await this.Greeting.findById(greetingId);
        const del = greeting.destroy();
        return del;
    }

    async createGreeting(greetingObject) {
        const greeting = await this.Greeting.create(greetingObject);
        return greeting.get();
    }

    getTypes() {
        return this.Type.findAll();
    }
}

const greetingModel = new GreetingModel();
module.exports = greetingModel;