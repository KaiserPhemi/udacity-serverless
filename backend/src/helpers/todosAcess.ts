// third-party libraries
import * as AWS from 'aws-sdk'
const AWSXRay = require('aws-xray-sdk');
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

// utils
import { createLogger } from '../utils/logger';

// models
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate';

const XAWS = AWSXRay.captureAWS(AWS)

const logger = createLogger('TodosAccess')

// TODO: Implement the dataLayer logic

export class TodoAccess {
  /**
   * Constructor
   * @param docClient 
   * @param todosTable 
   */
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly todosTable = process.env.TODOS_TABLE
  ) { }

  /**
   * Fetches all todos
   */
  async getAllTodos(): Promise<TodoItem[]> {
    const result = await this.docClient.scan({
      TableName: this.todosTable
    }).promise()
    const items = result.Items;
    return items as TodoItem[]
  }

  /**
   * Create a todo
   * @param todo 
   */
  async createTodo(todo: TodoItem): Promise<TodoItem> {
    await this.docClient.put({
      TableName: this.todosTable,
      Item: todo
    }).promise()
    return todo;
  }

  /**
   * Updates a todo
   * @param update 
   * @returns 
   */
  async updateTodo(update: TodoUpdate): Promise<TodoItem> {
    return;
  }
}

/**
 * Handles running app locally
 * @returns 
 */
function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    console.log('Creating a local DynamoDB instance')
    return new XAWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
  }
  return new XAWS.DynamoDB.DocumentClient();
}
