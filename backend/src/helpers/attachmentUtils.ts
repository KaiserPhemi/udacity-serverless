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
 * @param imageId
 * @returns 
 */
export const presignedUrl = (imageId: string) => {
  return s3.getSignedUrl('putObject', {
    Bucket: process.env.ATTACHMENT_S3_BUCKET,
    Key: imageId,
    Expires: parseInt(process.env.SIGNED_URL_EXPIRATION)
  })
}
