// third-party libraries
import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy';
import * as uuid from 'uuid';
import { cors, httpErrorHandler } from 'middy/middlewares';

// utils
import { presignedUrl } from '../../helpers/attachmentUtils';
import { setAttachmentUrl } from '../../helpers/todos';
import { getUserId } from '../utils';

const bucketName = process.env.ATTACHMENT_S3_BUCKET;

// handler
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
    try {
      const userId = getUserId(event);
      const imageId = uuid.v4();
      const uploadUrl = presignedUrl(imageId);
      const attachURL = `https://${bucketName}.s3.amazonaws.com/${imageId}`
      await setAttachmentUrl(todoId, attachURL, userId);

      return {
        statusCode: 201,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({ uploadUrl })
      }
    } catch (error) {
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
          error,
        }),
      };
    }
  }
);

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
);
