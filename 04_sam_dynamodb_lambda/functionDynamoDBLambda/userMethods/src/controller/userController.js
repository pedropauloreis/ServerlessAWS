const UserModel = require('../model/userModel');
const uuid = require('node-uuid');
const Password = require('../util/password');


var AWS = require("aws-sdk");
AWS.config.update({region: "eu-central-1"});
var docClient = new AWS.DynamoDB.DocumentClient();


class UserController {

    static async getByID (id) {
        var user = new UserModel();
        user.id = id;

        var params = {
            TableName: user.table,
            Key:{ "id": user.id}
        };


        const data = await docClient.get(params).promise();
        user.username = data.Item.username;
        user.name = data.Item.name;
        user.birthday = new Date(data.Item.birthday);

        return user;
    }

    static async getAll () {
        var user = new UserModel();

        var params = {
            TableName: user.table
        };

        const data = await docClient.scan(params).promise();
        
        var result = [];

        data.Items.forEach(element => {
            const user = new UserModel();
            user.id = element.id;
            user.username = element.username;
            user.name = element.name;
            user.birthday = new Date(element.birthday);

            result.push(user.serialize());
        }); 
        
    

        return result;
    }

    static async create (user) {
        user.id = uuid.v4();
        var params = {
            TableName:user.table,
            Item:{ 
                "id": user.id,
                "username": user.username,
                "name": user.name,
                "birthday": user.birthday.toISOString().split('T')[0],
                "password": await Password.toHash(user.password)
            }
        };

        await docClient.put(params).promise();
        return user;
    }

    static async login (user) {
        
        var params = {
            TableName: user.table,
            Key:{ "id": user.id}
        };

        var params = {
            TableName : user.table,
            IndexName : 'username-index',
            ProjectionExpression:"#un, password",
            KeyConditionExpression: "#un = :username",
            ExpressionAttributeNames:{
                "#un": "username"
            },
            ExpressionAttributeValues: {
                ":username": user.username
            }
        };


        const data = await docClient.query(params).promise();
        
        var token;
        token = { 
            result : "invalidAcess"
        }
    
        if(data.Items.length ===0)
        { 
            
            return token;

        }

        if(await Password.compare(data.Items[0].password,user.password))
        {
            var now = new Date();
            
            token = { 
                result : "validAcess",
                token: uuid.v1(),
                storedpassword: data.Items[0].password,
                givenpassword: user.password,
                date: now,
                expires: new Date(now.getTime() + 30*60000)
            }
        }

        return token;
    }

}

module.exports = UserController;