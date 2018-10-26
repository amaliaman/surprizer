const Sequelize = require('sequelize');

class Connection {
    constructor() {
        this.DB_URI = process.env.CONNECTION_STRING;            
        this.sequelize = new Sequelize(this.DB_URI);
        this.initialize();
    }

    async initialize() {
        try {
            await this.sequelize.authenticate();
            console.log('Connection has been established successfully.');
        }
        catch (err) {
            console.error('Unable to connect to the database:', err);
        }
    }
}

const connection = new Connection();
module.exports = connection;