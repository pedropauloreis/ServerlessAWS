const { getAll } = require('../controller/userController');
const UserController = require('../controller/userController');
const getAllRoute = async (event, context) => {

    response = {
        'statusCode': 200,
        'body': JSON.stringify(await UserController.getAll())
    }

    return response
};

module.exports = getAllRoute;
