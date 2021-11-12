/**
 * A Lambda function that sends messages payload to SQS.
 */
 var AWS = require('aws-sdk');
 // Set the region 
 AWS.config.update({region: 'eu-central-1'});
 
 exports.sqsPayloadSenderHandler = async (event, context) => {
 
     let response;
     
     var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
     const body = JSON.parse(event.body);
     console.log(body.message);
     var params = {
         // Remove DelaySeconds parameter and value for FIFO queues
         DelaySeconds: 0,
         MessageAttributes: {
             "Title": {
             DataType: "String",
             StringValue: "The Whistler"
             },
             "Author": {
             DataType: "String",
             StringValue: "John Grisham"
             },
             "WeeksOn": {
             DataType: "Number",
             StringValue: "6"
             }
         },
         MessageBody: body.message,
         // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
         // MessageGroupId: "Group1",  // Required for FIFO queues
         QueueUrl: process.env.SQSqueueName
     };
     
     console.log(params);
     
     try {
         const data = await sqs.sendMessage(params).promise();
         console.log("Success", data.MessageId);
         response = {
         'statusCode': 200,
         'body': JSON.stringify({result: "Success", MessageId: data.MessageId})
         }
     }
     catch(err){
         console.log("Error", err);
         response = {
         'statusCode': 500,
         'body': JSON.stringify(err)
         }
     }
 
     return response;
 }
 