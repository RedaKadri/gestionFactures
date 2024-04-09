import ClientMain from './components/clients-main';

import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getYears } from '@/db/queries';

async function ClientsPage() {
	const { user } = await validateRequest();
	if (!user) return redirect('/login');

	const years = await getYears();

	return (
		<div className='mx-auto py-4 container'>
			<ClientMain years={years} />
		</div>
	);
}

export default ClientsPage;
