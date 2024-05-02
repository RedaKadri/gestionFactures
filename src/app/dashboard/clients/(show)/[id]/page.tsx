import { getClientWithDetails } from '@/db/queries';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ClientTable from './components/client/client-data-table';
import { clientFactureColumns } from './components/client/client-facture-columns';
import ClientDetail from './components/client/client-detail';
import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { clientPaymentColumns } from './components/client/client-payment-columns';
import { ClientProvider } from '../client-provider';

export default async function ClientPage({ params }: { params: { id: string } }) {
	/**
	 * Validate the request and redirect to login if not authorized
	 */
	const { user } = await validateRequest();
	/**
	 * Redirect to login if not logged in
	 */
	if (!user) return redirect('/login');

	/**
	 * Get the client with its id from the params
	 */
	const { id } = params;
	/**
	 * Get the client's details with its factures and payments
	 */
	const { client, factures, payments } = await getClientWithDetails(id);

	/**
	 * If the client is not found, return a not found page
	 */
	if (!client)
		return (
			<div className='flex justify-center items-center h-[80vh]'>
				<h1 className='text-destructive font-mono font-bold text-6xl'>Client introuvable</h1>
			</div>
		);

	return (
		<ClientProvider>
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
		</ClientProvider>
	);
}
