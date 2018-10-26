const Sequelize = require('sequelize');
const connection = require('../dataAccess/Connection');

class UserModel {
    constructor() {
        this.User = connection.sequelize.define('user', {
            name: {
                type: Sequelize.STRING
            },
            isRegistered: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            email: {
                type: Sequelize.STRING,
                isEmail: true
            },
            phone: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            }
        });

        this.Role = connection.sequelize.define('role', {
            title: {
                type: Sequelize.STRING,
                notNull: true
            }
        });
    }

    // Methods
    async findUserById(id) { // TODO: return only relevant fields, not password
        const user = await this.User.findById(id);
        return user.get();
    };

    async findOrCreateUser(conditionObject, userObject) { // TODO: return only relevant fields, not password
        const user = await this.User.findOrCreate(
            {
                where: conditionObject,
                defaults: userObject
            })
            .spread(userModel => {
                return userModel.get();
            });
        return user;
    };

    async createUser(name, isRegistered, email, phone, password) {
        const userModel = this.User.create({ name, isRegistered, email, phone, password });
        return userModel.get();
    }

    async updateUser(userId, updateObject) {
        const user = await this.User.findById(userId);
        const update = user.update(updateObject);
        return update;
    }
}

const userModel = new UserModel();
module.exports = userModel;