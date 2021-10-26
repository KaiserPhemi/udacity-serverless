// third-aprty libraries
import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares';

// business logic
import { getTodosForUser as getTodosForUser } from '../../businessLogic/todos'

// utils
import { getUserId } from '../utils';

// TODO: Get all TODO items for a current user
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Write your code here
    console.log(event)
    const todos = '...'

    return undefined

handler.use(
  cors({
    credentials: true
  })
)
