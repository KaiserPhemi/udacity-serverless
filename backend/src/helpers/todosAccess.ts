// third-party libraries
import * as AWS from 'aws-sdk'
const AWSXRay = require('aws-xray-sdk');
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

// utils
// import { createLogger } from '../utils/logger';

// models
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate';

const XAWS = AWSXRay.captureAWS(AWS)

// const logger = createLogger('TodosAccess')

// TODO: Implement the dataLayer logic
export class TodosAccess {
  /**
   * Constructor
   * @param docClient 
   * @param todosTable 
   */
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly todosTable = process.env.TODOS_TABLE,
    private readonly indexName = process.env.TODOS_CREATED_AT_INDEX

  ) { }

  /**
   * Fetches all todos for a user
   * @param userId
   * @returns
   */
  async getAllTodos(userId: string): Promise<TodoItem[]> {
    const result = await this.docClient.query({
      TableName: this.todosTable,
      IndexName: this.indexName,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    }).promise()
    const items = result.Items;
    return items as TodoItem[]
  }

  /**
   * Fetch a single todo
   * @param todoId 
   * @returns 
   */
  async getTodo(todoId: string): Promise<TodoItem> {
    const result = await this.docClient.query({
      TableName: this.todosTable,
      KeyConditionExpression: 'todoId = :todoId',
      ExpressionAttributeValues: {
        ':todoId': todoId
      }
    }).promise()

    const item = result.Items[0];
    return item as TodoItem;
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
   * @param todoId
   * @param userId
   * @param update 
   * @returns 
   */
  async updateTodo(todoId: string, userId: string, update: TodoUpdate): Promise<TodoUpdate> {
    await this.docClient.update({
      TableName: this.todosTable,
      Key: {
        todoId,
        userId,
      },
      UpdateExpression: `set #name = :n, dueDate= :d, done=:done`,
      ExpressionAttributeValues: {
        ':n': update.name,
        ':d': update.dueDate,
        ':done': update.done
      },
      ExpressionAttributeNames: {
        "#name": "name"
      }
    }).promise();
    return update;
  }

  /**
   * Deletes a todo
   * @param todoId
   * @param userId
   * @returns 
   */
  async deleteTodo(todoId: string, userId: string): Promise<string> {
    await this.docClient.delete({
      TableName: this.todosTable,
      Key: {
        todoId,
        userId
      }
    }).promise();
    return todoId;
  }

  /**
   * Sets the attachement url for a todo
   * @param todoId 
   * @param attachmentUrl 
   * @param userId
   */
  public async setAttachmentUrl(
    todoId: string,
    attachmentUrl: string,
    userId: string
  ): Promise<void> {
    this.docClient
      .update({
        TableName: this.todosTable,
        Key: { todoId, userId },
        UpdateExpression: 'set attachmentUrl = :attachmentUrl',
        ExpressionAttributeValues: {
          ':attachmentUrl': attachmentUrl,
        },
        ReturnValues: 'UPDATED_NEW',
      }).promise();
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
