import { type NextRequest } from 'next/server'
import { visitMiddleware } from './utils/visit_control/middleware'

/**
 * Executes the middleware function for the given request.
 * @param request - The NextRequest object representing the incoming request.
 * @returns A Promise that resolves to the result of the updateSession function.
 */
export async function middleware(request: NextRequest) {
	return await visitMiddleware(request)
}

/**
 * The configuration object for the middleware.
 */
export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * Feel free to modify this pattern to include more paths.
		 */
		// "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
		'/code/:project*',
	],
}
