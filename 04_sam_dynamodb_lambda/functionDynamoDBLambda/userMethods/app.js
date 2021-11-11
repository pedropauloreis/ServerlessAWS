const getAllRoute = require('./src/routes/getAllRoute');
const getRoute = require('./src/routes/getRoute');
const postRoute = require('./src/routes/postRoute');
const loginRoute = require('./src/routes/loginRoute');


exports.getAllHandler = async (event, context) => {
    return await getAllRoute(event,context);
};


exports.getHandler = async (event, context) => {
    return await getRoute(event,context);
};


exports.postHandler = async (event, context) => {
    return await postRoute(event,context);
};

exports.loginHandler = async (event, context) => {
    return await loginRoute(event,context);
};