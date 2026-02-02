import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

/**
 * JWT Payload interface
 */
export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';
const SESSION_COOKIE_NAME = 'auth-token';
const SALT_ROUNDS = 10;
const TOKEN_EXPIRY = '7d'; // 7 days

/**
 * Hash a password using bcryptjs
 * 
 * @param {string} password - Plain text password to hash
 * @returns {Promise<string>} Hashed password
 * 
 * @example
 * ```typescript
 * const hashedPassword = await hashPassword(userPassword);
 * await User.create({ email, password: hashedPassword });
 * ```
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
  } catch (error) {
    console.error('Password hashing failed:', error);
    throw new Error('Failed to hash password');
  }
}

/**
 * Verify a password against its hash
 * 
 * @param {string} password - Plain text password to verify
 * @param {string} hashedPassword - Hashed password to compare against
 * @returns {Promise<boolean>} True if password matches, false otherwise
 * 
 * @example
 * ```typescript
 * const user = await User.findById(userId);
 * const isValid = await verifyPassword(inputPassword, user.password);
 * if (!isValid) throw new Error('Invalid password');
 * ```
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error('Password verification failed:', error);
    return false;
  }
}

/**
 * Generate a JWT token
 * 
 * @param {JWTPayload} payload - User data to encode in token
 * @returns {string} Signed JWT token
 * 
 * @example
 * ```typescript
 * const token = generateToken({
 *   userId: user._id.toString(),
 *   email: user.email,
 *   role: user.role,
 * });
 * ```
 */
export function generateToken(payload: JWTPayload): string {
  try {
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRY,
    });
    return token;
  } catch (error) {
    console.error('Token generation failed:', error);
    throw new Error('Failed to generate token');
  }
}

/**
 * Verify and decode a JWT token
 * 
 * @param {string} token - JWT token to verify
 * @returns {JWTPayload | null} Decoded payload if valid, null if invalid
 * 
 * @example
 * ```typescript
 * const payload = verifyToken(token);
 * if (!payload) return null; // Invalid token
 * console.log(payload.userId); // Access user data
 * ```
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

/**
 * Get the current user session from cookies
 * 
 * @returns {Promise<JWTPayload | null>} Current session payload or null if not authenticated
 * 
 * @example
 * ```typescript
 * const session = await getSession();
 * if (!session) return redirect('/login');
 * console.log(session.userId); // Use session data
 * ```
 */
export async function getSession(): Promise<JWTPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!token) {
      return null;
    }

    const payload = verifyToken(token);
    return payload;
  } catch (error) {
    console.error('Session retrieval failed:', error);
    return null;
  }
}

/**
 * Set authentication session in cookies
 * 
 * @param {string} token - JWT token to store
 * @returns {Promise<void>}
 * 
 * @example
 * ```typescript
 * const token = generateToken(userData);
 * await setSession(token);
 * // User is now authenticated
 * ```
 */
export async function setSession(token: string): Promise<void> {
  try {
    const cookieStore = await cookies();
    const decoded = jwt.decode(token) as any;
    const expiresAt = decoded?.exp ? new Date(decoded.exp * 1000) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    cookieStore.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      expires: expiresAt,
    });
  } catch (error) {
    console.error('Session setting failed:', error);
    throw new Error('Failed to set session');
  }
}

/**
 * Clear the authentication session
 * 
 * @returns {Promise<void>}
 * 
 * @example
 * ```typescript
 * await clearSession();
 * // User is now logged out
 * ```
 */
export async function clearSession(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
  } catch (error) {
    console.error('Session clearing failed:', error);
    throw new Error('Failed to clear session');
  }
}

export default {
  hashPassword,
  verifyPassword,
  generateToken,
  verifyToken,
  getSession,
  setSession,
  clearSession,
};
