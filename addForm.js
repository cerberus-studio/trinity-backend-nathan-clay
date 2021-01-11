'use strict';
const AWS = require('aws-sdk');
const uuid = require('uuid');
const validator = require('email-validator');

const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.addForm = async (event, context, callback) => {

    const data = JSON.parse(event.body);

    const form = {
        id: uuid.v1(),
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        website: data.website || '',
        email: data.email || '',
        phoneNumber: data.phoneNumber || '',
    }

    if (!validator.validate(form.email)) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            body: 'Valid email required',
        };
    }

    const params = {
        TableName: 'forms',
        Item: form,
    };
    try {
        await documentClient.put(params).promise();
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
        };
        return response;
    } catch (e) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            body: JSON.stringify(e)
        };
    }
};