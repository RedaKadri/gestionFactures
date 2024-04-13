import { getClientWithDetails } from '@/db/queries';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ClientTable from './components/client/client-data-table';
import { clientFactureColumns } from './components/client/client-facture-columns';
import ClientDetail from './components/client/client-detail';
import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { clientPaymentColumns } from './components/client/client-payment-columns';

export default async function ClientPage({ params }: { params: { id: string } }) {
	const { user } = await validateRequest();
	if (!user) return redirect('/login');

	const { id } = params;
	const { client, factures, payments } = await getClientWithDetails(id);

	return (
		<div className='flex items-start gap-10 mt-5 justify-center flex-wrap'>
			<Tabs defaultValue='factures' className='2xl:w-[60vw]'>
				<TabsList>
					<TabsTrigger value='factures'>Factures</TabsTrigger>
					<TabsTrigger value='payments'>Payments</TabsTrigger>
				</TabsList>
				<TabsContent value='factures'>
					<ClientTable columns={clientFactureColumns} data={factures} />
				</TabsContent>
				<TabsContent value='payments'>
					<ClientTable columns={clientPaymentColumns} data={payments} />
				</TabsContent>
			</Tabs>

			<ClientDetail client={client} />
		</div>
	);
}
