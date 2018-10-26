const Sequelize = require('sequelize');

class Connection {
    constructor() {
        this.DB_URI = process.env.CONNECTION_STRING ||
            'postgres://fhsxzarr:9zrrJD7AYL1DznzmZL4GdokrA0MPym4x@packy.db.elephantsql.com:5432/fhsxzarr';
            // 'postgres://pvlbdktl:deAabIvErM4wb8_zHglwxE0UXPd8IXK8@horton.elephantsql.com:5432/pvlbdktl';
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