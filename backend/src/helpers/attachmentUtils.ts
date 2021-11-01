import * as AWS from 'aws-sdk'
// import * as AWSXRay from 'aws-xray-sdk'
const AWSXRay = require('aws-xray-sdk');

const XAWS = AWSXRay.captureAWS(AWS)

// TODO: Implement the fileStogare logic
const docClient = new XAWS.DynamoDB.DocumentClient()