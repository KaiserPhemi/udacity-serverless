// third-party libraries
import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

// business logic
import { deleteTodo } from '../../businessLogic/todos';

// utils
import { getUserId } from '../utils'

/**
 * Handler
 */
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    // TODO: Remove a TODO item by id
    
    return undefined
  });

handler
  .use(httpErrorHandler())
  .use(
    cors({ credentials: true })
  );
