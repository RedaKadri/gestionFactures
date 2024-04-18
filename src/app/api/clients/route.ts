import { getClientsWithDetails } from '@/db/queries';

/**
 * Returns clients with details in a specific year
 * @param {Request} request The request object
 * @returns {Promise<Response>} JSON response of clients data
 */
export async function GET(request: Request): Promise<Response> {
	// Get search params from url
	const { searchParams } = new URL(request.url);

	// Get year from search params or current year if 0
	const year: number = searchParams.get('year') !== '0' ? Number(searchParams.get('year')) : new Date().getFullYear();

	// Get clients with details with given year
	const clients = await getClientsWithDetails(year);

	// Return clients data as JSON response
	return Response.json(clients);
}
