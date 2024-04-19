'use client';

import useSWR from 'swr';
import { columns } from './clients-columns';
import DataTable from './clients-data-table';
import { useState } from 'react';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Loading from '@/components/Loading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { columns0 } from './clients-0-columns';

/**
 * A simple fetcher function to handle JSON responses.
 *
 * @param args The arguments to pass to `fetch`.
 * @returns The JSON response body as resolved by `fetch`.
 */
const fetcher = (...args: Parameters<typeof fetch>) =>
	fetch(...args) // Make the API request using the arguments.
		.then((res) => res.json()) // Parse the response body as JSON.
		/**
		 * If an error occurs during the parsing, we reject the promise
		 * with the error.
		 */
		.catch((err) => {
			throw err;
		});

export default function ClientMain({ years, clientsWithOFacture }: any) {
	/**
	 * Current year of clients to fetch.
	 */
	const [year, setYear] = useState<string>('0');

	/**
	 * Get clients by year from API.
	 */
	const { data, isLoading } = useSWR(`http://localhost:3000/api/clients?year=${year}`, fetcher);

	/**
	 * If there's a loading state, we return a loading component.
	 */
	if (isLoading) return <Loading />;

	return (
		<div className='mx-auto py-1'>
			<Tabs defaultValue='clientsWithFactures'>
				<TabsList>
					<TabsTrigger value='clientsWithFactures'>Clients avec factures</TabsTrigger>
					<TabsTrigger value='clientsWith0Factures'>Clients sans factures</TabsTrigger>
				</TabsList>
				<TabsContent value='clientsWithFactures'>
					<div className='flex justify-center'>
						<Select onValueChange={(value: string) => setYear(value)}>
							<SelectTrigger className='w-[190px]'>
								<SelectValue placeholder='Choisissez une année' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{years?.map((year: { value: number }) => (
										<SelectItem key={year.value} value={year.value.toString()}>
											{year.value}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<DataTable columns={columns} data={data} />
				</TabsContent>
				<TabsContent value='clientsWith0Factures'>
					<div className='mt-[48px]'>
						<DataTable columns={columns0} data={clientsWithOFacture} />
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
