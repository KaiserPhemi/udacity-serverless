// third-party libraries
import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

// business logic
import { deleteTodo } from '../../helpers/todos';

// utils
// import { getUserId } from '../utils'

/**
 * Handler
 */
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    // TODO: Remove a TODO item by id
    const deletedItem = await deleteTodo(todoId);
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        message: "Item deleted",
        deletedItem,
      })
    }
  });

handler
  .use(httpErrorHandler())
  .use(
    cors({ credentials: true })
  );
