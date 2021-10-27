// third-party libraries
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import uuid from 'uuid';
import 'source-map-support/register';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';

// requests
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'

// utils
import { getUserId } from '../utils';

import { createTodo } from '../../businessLogic/todos';


// handler 
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    // TODO: Implement creating a new TODO item
    const todoId = uuid.v4();
    const newTodoItem = {
      todoId,
      ...newTodo
    }

    // TODO add to db

    return;
)

handler.use(
  cors({
    credentials: true
  })
)
