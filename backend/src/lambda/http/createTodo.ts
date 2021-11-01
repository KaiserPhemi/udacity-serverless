// third-party libraries
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';

// requests
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'

// helper function
import { createTodo } from '../../helpers/todos';

// handler 
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTodo: CreateTodoRequest = JSON.parse(event.body);
    const authorization = event.headers.Authorization;
    const split = authorization.split(' ');
    const jwtToken = split[1];
    // TODO: Implement creating a new TODO item
    const newTodoItem = await createTodo(newTodo, jwtToken);
    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        newTodoItem
      })
    }
  }
);

handler.use(
  cors({
    credentials: true
  })
)
