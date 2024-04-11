'use client';

import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import FactureDeleteDialog from './delete-facture-dialog';
import FactureUpdateDialog from './update-facture-dialog';
import PaymentCreateDialog from './create-payment-dialog';

export const clientFactureColumns: ColumnDef<any>[] = [
	{
		id: 'id',
		accessorKey: 'id',
		header: 'Code',
	},
	{
		accessorKey: 'clientId',
		header: 'Client Code',
	},
	{
		accessorKey: 'totalAmount',
		header: 'Montant Toltal',
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('totalAmount'));

			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'MAD',
			}).format(amount);

			return <div className='font-medium'>{formatted}</div>;
		},
	},
	{
		accessorKey: 'clientPayment',
		header: 'Montant Payé',
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('clientPayment') ?? '0');

			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'MAD',
			}).format(amount);

			return <div className='font-medium'>{formatted}</div>;
		},
	},
	{
		header: 'Montant Restant',
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('totalAmount')) - parseFloat(row.getValue('clientPayment') ?? '0');

			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'MAD',
			}).format(amount);

			return <div className='font-medium'>{formatted}</div>;
		},
	},
	{
		accessorKey: 'issueYear',
		header: ({ column }) => {
			return (
				<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Année de facture
					<ArrowUpDown className='ml-1 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => <p className='ms-4'>{row.getValue('issueYear')}</p>,
	},
	{
		accessorKey: 'status',
		header: 'Statut',
		cell: ({ row }) => {
			return row.original.status === 'payé' ? (
				<span className='text-green-700 font-bold'>{row.original.status}</span>
			) : (
				<span className='text-destructive font-bold'>{row.original.status}</span>
			);
		},
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
						<PaymentCreateDialog factureId={row.getValue('id')} />
						<DropdownMenuSeparator />
						<FactureUpdateDialog facture={row.original} />
						<FactureDeleteDialog id={row.getValue('id')} />
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
