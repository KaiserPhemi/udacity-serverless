// third-party libraries
import { JwtHeader } from 'jsonwebtoken';

// interface
import { JwtPayload } from './JwtPayload'

/**
 * Interface representing a JWT token
 */
export interface Jwt {
  header: JwtHeader
  payload: JwtPayload
}
