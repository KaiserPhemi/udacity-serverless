// third-party libraries
import * as uuid from 'uuid';
// import * as createError from 'http-errors';

// data layer logic
import { TodosAccess } from './todosAccess';

// models
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest';
import { TodoUpdate } from '../models/TodoUpdate';
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest';

// utils
import { createLogger } from '../utils/logger';
import { parseUserId } from '../auth/utils';
// import { AttachmentUtils } from './attachmentUtils';

// TODO: Implement businessLogic
const todoAccess = new TodosAccess();
const logger = createLogger('todo');

/**
 * Fetch all todos
 * @returns 
 */
export async function getAllTodos(userId: string): Promise<TodoItem[]> {
  logger.info('Fetching all todos');
  return todoAccess.getAllTodos(userId);
}

/**
 * Add a new todo
 * @param createTodoRequest
 * @param jwtToken
 * @returns
 */
export async function createTodo(
  createTodoRequest: CreateTodoRequest,
  jwtToken: string
): Promise<TodoItem> {
  const itemId = uuid.v4()
  const userId = parseUserId(jwtToken)
  return await todoAccess.createTodo({
    userId,
    todoId: itemId,
    createdAt: new Date().toISOString(),
    name: createTodoRequest.name,
    dueDate: createTodoRequest.dueDate,
    done: false,
  });
}

/**
 * Updates a todo item
 * @param todoId
 * @param updateTodoRequest
 * @returns
 */
export async function updateTodo(
  todoId: string,
  userId: string,
  updateTodoRequest: UpdateTodoRequest,
): Promise<TodoUpdate> {
  return await todoAccess.updateTodo(todoId, userId, updateTodoRequest);
}

/**
 * Delete a todo item
 * @param todoId
 * @param userId
 * @returns 
 */
export async function deleteTodo(todoId: string, userId: string): Promise<string> {
  return await todoAccess.deleteTodo(todoId, userId)
}

/**
 * Sets the attachment URL
 * @param todoId 
 * @param attachmentUrl 
 * @param userId
 */
export async function setAttachmentUrl(
  todoId: string,
  attachmentUrl: string,
  userId: string
): Promise<void> {
  todoAccess.setAttachmentUrl(todoId, attachmentUrl, userId);
}
