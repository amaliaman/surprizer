const Sequelize = require('sequelize');
const connection = require('../dataAccess/Connection');

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
                type: Sequelize.STRING,
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
    async getGreetingsByEventTrimmed(eventId, userId) { // TODO: security trim by userId
        const greetings = this.Greeting.findAll({ where: { eventId: eventId }, include: [userModel.User] });
        return greetings.map(g => g.get());
    };
}

const greetingModel = new GreetingModel();
module.exports = greetingModel;