'use client';

import useSWR from 'swr';
import { columns } from './clients-columns';
import DataTable from './clients-data-table';
import { useState } from 'react';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Loading from '@/components/Loading';

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

export default function ClientMain({ years }: any) {
	const [year, setYear] = useState('0');

	const { data, isLoading } = useSWR(`http://localhost:3000/api/clients?year=${year}`, fetcher);

	if (isLoading) return <Loading />;

	return (
		<div className='mx-auto py-1'>
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
		</div>
	);
}
