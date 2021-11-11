const UserController = require('../controller/userController');

const getRoute = async (event, context) => {

    const user = await UserController.getByID(event.pathParameters.id);

    response = {
        'statusCode': 200,
        'body': JSON.stringify(user.serialize())
    }

    return response
};

module.exports = getRoute;