'use client';

import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import PaymentDeleteDialog from './delete-payment-dialog';
import PaymentUpdateDialog from './update-payment-dialog';

export const clientPaymentColumns: ColumnDef<any>[] = [
	{
		id: 'id',
		accessorKey: 'id',
		header: 'Code',
	},
	{
		accessorKey: 'factureId',
		header: 'Facture Code',
	},
	{
		accessorKey: 'amount',
		header: 'Montant payé',
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('amount'));

			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'MAD',
			}).format(amount);

			return <div className='font-medium'>{formatted}</div>;
		},
	},
	{
		accessorKey: 'issueYear',
		header: 'Année de facture',
	},
	{
		accessorKey: 'updatedAt',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Date de paiement
					<ArrowUpDown className='ml-1 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => <p className='ms-4'>{(row.getValue('updatedAt') as string).slice(0, 16)}</p>,
	},
	{
		id: 'actions',
		header: 'Actions',
		cell: ({ row }) => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='h-8 w-8 p-0'>
							<span className='sr-only'>Ouvrir le menu</span>
							<MoreHorizontal className='h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<PaymentUpdateDialog payment={row.original} />
						<PaymentDeleteDialog id={row.getValue('id')} />
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
