// third-party libraries
import * as uuid from 'uuid';
// import * as createError from 'http-errors';

// data layer logic
import { TodosAccess } from './todosAccess';

// models
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest';
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest';

// utils
import { createLogger } from '../utils/logger';
// import { AttachmentUtils } from './attachmentUtils';
import { parseUserId } from '../auth/utils';

// TODO: Implement businessLogic
const todoAccess = new TodosAccess();
const logger = createLogger('todo');

/**
 * Fetch all todos
 * @returns 
 */
export async function getAllTodos(): Promise<TodoItem[]> {
  logger.info('Fetching all todos');
  return todoAccess.getAllTodos();
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
 * @param updateTodoRequest
 * @param jwtToken
 * @returns
 */
export async function updateTodo(
  updateTodoRequest: UpdateTodoRequest,
  jwtToken: string
) {
  const userId = parseUserId(jwtToken)
  return await todoAccess.updateTodo({
    ...updateTodoRequest
  });
}

/**
 * Delete a todo item
 * @param todoId 
 * @returns 
 */
export async function deleteTodo(todoId: string) {
  return await todoAccess.deleteTodo(todoId)
}
