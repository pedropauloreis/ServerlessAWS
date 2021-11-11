class dynamoDBTable {
    _table  = "";

    constructor(table) {
        this._table = table;
    }

    set table(val) { this._table = val; }
    get table() { return this._table; }
}

module.exports = dynamoDBTable