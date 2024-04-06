import { getClient } from '@/db/queries';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ClientFactureTable from './components/client-facutre-table';
import { clientFactureColumns } from './components/client-facture-columns';
import ClientDetail from './components/client-detail';
import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function page({ params }: { params: { id: string } }) {
	const { user } = await validateRequest();
	if (!user) return redirect('/login');

	const { id } = params;
	const { client, factures } = await getClient(id);

	return (
		<div className='flex items-start gap-16 mt-16'>
			<Tabs defaultValue='factures' className='w-2/3'>
				<TabsList>
					<TabsTrigger value='factures'>Factures</TabsTrigger>
					<TabsTrigger value='payments'>Payments</TabsTrigger>
				</TabsList>
				<TabsContent value='factures'>
					<ClientFactureTable columns={clientFactureColumns} data={factures} />
				</TabsContent>
				<TabsContent value='payments'>payments table</TabsContent>
			</Tabs>

			<ClientDetail client={client} />
		</div>
	);
}
