import { validateRequest } from '@/lib/auth';
import CreateForm from './create-form';
import { redirect } from 'next/navigation';

export default async function CreateClient() {
	const { user } = await validateRequest();
	if (!user) return redirect('/login');

	return (
		<div className='w-full flex justify-center items-center h-[80vh] container'>
			<div className='flex items-center justify-center'>
				<div className='mx-auto grid w-[350px] gap-6'>
					<div className='grid gap-2 text-center'>
						<h1 className='text-3xl font-bold'>Créer un Client</h1>
						<p className='text-muted-foreground'>
							Entrez les informations ci-dessous pour ajouter un client
						</p>
					</div>
					<CreateForm />
				</div>
			</div>
		</div>
	);
}
