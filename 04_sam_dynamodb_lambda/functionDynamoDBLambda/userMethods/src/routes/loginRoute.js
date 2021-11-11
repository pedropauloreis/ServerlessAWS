const UserController = require('../controller/userController');
const UserModel = require('../model/userModel');

const postRoute = async (event, context) => {

    body = JSON.parse(event.body)
    var user = new UserModel();
    user.username = body.username;
    user.password = body.password;
    
    try {

        const token = await UserController.login(user);
        response = {
            'statusCode': 200,
            'body': JSON.stringify(token)
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