// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    // debuging event
    console.log("EVENT: \n" + JSON.stringify(event, null, 2));
    const person_name = event["queryStringParameters"]['name'] || undefined;
    const person_id = event["queryStringParameters"]['id'] || undefined;

    try {
        // const ret = await axios(url);
        if (person_id && person_name) {
            response = {
                'statusCode': 200,
                'body': JSON.stringify({
                    message: `hello ${person_name} you now have an id ${person_id}`,
                })
            }
        } else if (person_id == undefined || person_name == undefined) {
            response = {
                'body': JSON.stringify({
                    message: `Error the name: ${person_name} or id: ${person_id} is empty`,
                })
            }

        } else {
            response = {
                'statusCode': 200,
                'body': JSON.stringify({
                    message: `welcome to the home page`,
                })
            }
        }
    } catch (err) {
        console.log("the error is: ", err);
        return err;
    }

    return response
};
