import * as AWS from 'aws-sdk'
const AWSXRay = require('aws-xray-sdk');

const XAWS = AWSXRay.captureAWS(AWS)

// TODO: Implement the fileStogare logic
const docClient = new XAWS.DynamoDB.DocumentClient()