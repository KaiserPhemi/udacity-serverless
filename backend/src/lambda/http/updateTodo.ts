// third-party libraries
import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

// helper functions
import { updateTodo } from '../../helpers/todos';
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'

// utils
import { getUserId } from '../utils'

// handler
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body);
    const userId = getUserId(event)

    // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
    await updateTodo(todoId, userId, updatedTodo);
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        updatedTodo
      })
    }
  })

handler
  .use(httpErrorHandler())
  .use(
    cors({ credentials: true })
  );
