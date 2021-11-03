// third-party libraries
import * as AWS from 'aws-sdk'
const AWSXRay = require('aws-xray-sdk');

const XAWS = AWSXRay.captureAWS(AWS)

// TODO: Implement the fileStogare logic
const s3 = new XAWS.S3({
  signatureVersion: 'v4'
});

/**
 * Create an upload url
 * @param todoId 
 * @returns 
 */
export const presignedUrl = (todoId: string) => {
  return s3.getSignedUrl('putObject', {
    Bucket: process.env.ATTACHMENT_S3_BUCKET,
    Key: todoId,
    Expires: process.env.SIGNED_URL_EXPIRATION
  })
}
