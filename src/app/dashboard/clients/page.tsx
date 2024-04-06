import ClientMain from './client-main';

import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getYears } from '@/db/queries';

async function clientPage() {
	const { user } = await validateRequest();
	if (!user) return redirect('/login');

	const years = await getYears();

	return (
		<div className='container mx-auto py-4'>
			<ClientMain years={years} />
		</div>
	);
}

export default clientPage;
