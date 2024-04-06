import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';

async function Facture() {
	const { user } = await validateRequest();
	if (!user) return redirect('/login');

	return <div>Facture</div>;
}

export default Facture;
