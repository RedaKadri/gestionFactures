import ClientMain from './components/clients-main';

import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getClientsWithOFactures, getYears } from '@/db/queries';

async function ClientsPage() {
	// Check if user is authenticated
	const { user } = await validateRequest();
	// If not, redirect to login page
	if (!user) return redirect('/login');

	// Get years of factures
	const years = await getYears();
	// Get clients that do not have any factures
	const clientWith0Facture = await getClientsWithOFactures();

	return (
		<div className='mx-auto py-4 container'>
			<ClientMain years={years} clientsWithOFacture={clientWith0Facture} />
		</div>
	);
}

export default ClientsPage;
