const dynamoDBTable = require('./dynamoDBTable');

class UserModel extends dynamoDBTable {
    _id = '';
    _username = '';
    _name = '';
    _birthday = new Date();
    _password = '';
    

    constructor() {
        super("users");
    }

    set id(val) { this._id = val; }
    get id() { return this._id; }

    set username(val) { this._username = val; }
    get username() { return this._username; }

    set name(val) { this._name = val; }
    get name() { return this._name; }

    set birthday(val) { this._birthday = val; }
    get birthday() { return this._birthday; }

    set password(val) { this._password = val; }
    get password() { return this._password; }

    serialize(){
        return {
            id: this._id,
            username: this._username,
            name: this._name,
            birthday: this._birthday.toISOString().split('T')[0]
        };
    }

}

module.exports = UserModel;
