import { NextRequest, NextResponse } from 'next/server';
import { getSession, JWTPayload } from './auth';

/**
 * Middleware to protect API routes
 * Usage in API routes:
 * 
 * import { withAuth } from '@/lib/middleware';
 * 
 * export const POST = withAuth(async (request, session) => {
 *   // Your authenticated route logic here
 *   // session contains: { userId, email, role }
 * });
 */

export type AuthenticatedHandler = (
  request: NextRequest,
  session: JWTPayload,
  context?: any
) => Promise<NextResponse> | NextResponse;

/**
 * Protect routes requiring authentication
 * 
 * @param handler - Route handler with access to session
 * @returns Protected middleware function
 * 
 * @example
 * ```typescript
 * export const POST = withAuth(async (request, session) => {
 *   console.log(session.userId);
 *   return successResponse({ message: 'Success' });
 * });
 * ```
 */
export function withAuth(handler: AuthenticatedHandler) {
  return async (request: NextRequest, context?: any) => {
    const session = await getSession();

    if (!session) {
      return errorResponse('Unauthorized - Please login', 401);
    }

    try {
      return await handler(request, session, context);
    } catch (error) {
      console.error('Route handler error:', error);
      return errorResponse('Internal server error', 500);
    }
  };
}

/**
 * Middleware to check for specific roles
 * Must be used after withAuth middleware
 * 
 * @param allowedRoles - Array of roles that can access this route
 * @returns Middleware function that wraps a handler
 * 
 * @example
 * ```typescript
 * export const DELETE = withRole(['admin'])(async (request, session) => {
 *   // Only admins can reach here
 *   return successResponse({ message: 'Admin action completed' });
 * });
 * ```
 */
export function withRole(allowedRoles: string[]) {
  return (handler: AuthenticatedHandler) => {
    return withAuth(async (request, session, context) => {
      if (!allowedRoles.includes(session.role)) {
        return errorResponse('Forbidden - Insufficient permissions', 403);
      }

      try {
        return await handler(request, session, context);
      } catch (error) {
        console.error('Role-protected route error:', error);
        return errorResponse('Internal server error', 500);
      }
    });
  };
}

/**
 * Rate limiting helper (simple in-memory implementation)
 * For production, use Redis or a proper rate limiting service
 * 
 * @param maxRequests - Maximum requests allowed per window (default: 100)
 * @param windowMs - Time window in milliseconds (default: 60000 for 1 minute)
 * @returns Rate limit checker function
 * 
 * @example
 * ```typescript
 * const limiter = rateLimit(10, 60000); // 10 requests per minute
 * 
 * export async function GET(request: NextRequest) {
 *   const allowed = await limiter(request);
 *   if (!allowed) {
 *     return errorResponse('Too many requests', 429);
 *   }
 *   // Handle request...
 * }
 * ```
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(maxRequests: number = 100, windowMs: number = 60000) {
  return async (request: NextRequest): Promise<boolean> => {
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('cf-connecting-ip') || 
               'unknown';
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record || now > record.resetTime) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
      return true;
    }

    if (record.count >= maxRequests) {
      return false;
    }

    record.count++;
    return true;
  };
}

/**
 * CORS helper for API routes
 * Returns CORS header object for NextResponse
 * 
 * @param origin - Allowed origin (default: any origin)
 * @returns CORS headers object
 * 
 * @example
 * ```typescript
 * export async function GET(request: NextRequest) {
 *   const data = await getData();
 *   return NextResponse.json(data, {
 *     headers: corsHeaders('https://example.com')
 *   });
 * }
 * ```
 */
export function corsHeaders(origin?: string) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

/**
 * Error response helper
 * Standardizes error responses across API routes
 * 
 * @param message - Error message to return
 * @param status - HTTP status code (default: 500)
 * @returns Formatted error response
 * 
 * @example
 * ```typescript
 * if (!user) {
 *   return errorResponse('User not found', 404);
 * }
 * ```
 */
export function errorResponse(message: string, status: number = 500) {
  return NextResponse.json(
    { error: message, success: false },
    { status }
  );
}

/**
 * Success response helper
 * Standardizes success responses across API routes
 * 
 * @param data - Response data to send
 * @param status - HTTP status code (default: 200)
 * @returns Formatted success response
 * 
 * @example
 * ```typescript
 * const user = await User.findById(id);
 * return successResponse({ user });
 * 
 * // Or with custom status
 * const newProject = await Project.create(data);
 * return successResponse({ project: newProject }, 201);
 * ```
 */
export function successResponse(data: any, status: number = 200) {
  return NextResponse.json(
    { ...data, success: true },
    { status }
  );
}