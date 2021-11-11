
exports.lambdaHandler = async (event, context) => {
   console.log(event.Records);
   event.Records.forEach(element => {
       console.log(element.dynamodb);
   });
};
