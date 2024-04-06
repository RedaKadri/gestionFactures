import { getClients } from '@/db/queries';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const year = searchParams.get('year') !== '0' ? Number(searchParams.get('year')) : new Date().getFullYear();

	const clients = await getClients(year);

	return Response.json(clients);
}
