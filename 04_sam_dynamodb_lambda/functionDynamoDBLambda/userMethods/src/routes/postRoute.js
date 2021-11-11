const UserController = require('../controller/userController');
const UserModel = require('../model/userModel');

const postRoute = async (event, context) => {

    body = JSON.parse(event.body)
    var user = new UserModel();
    user.username = body.username;
    user.name = body.name;
    user.birthday = new Date(body.birthday);
    user.password = body.password;
    
    try {

        user = await UserController.create(user);
        response = {
            'statusCode': 201,
            'body': JSON.stringify(user.serialize())
        }

    } catch (err) {
        console.log(err);
        response = {
            'statusCode': 500,
            'body': JSON.stringify(err)
        }
        
    }

    

    return response
};


module.exports = postRoute;