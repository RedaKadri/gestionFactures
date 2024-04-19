'use client';

import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

export const columns: ColumnDef<any>[] = [
	{
		id: 'clientId',
		accessorKey: 'clientId',
		header: 'Code',
	},
	{
		accessorKey: 'clientName',
		header: 'Nom',
	},
	{
		accessorKey: 'clientTel',
		header: 'Tél',
	},
	{
		accessorKey: 'FactureTotalAmount',
		header: 'Montant Toltal',
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('FactureTotalAmount'));

			return <div className='font-medium'>{formatCurrency(amount)}</div>;
		},
	},
	{
		accessorKey: 'clientPayment',
		header: 'Montant Payé',
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('clientPayment') ?? '0');

			return <div className='font-medium'>{formatCurrency(amount)}</div>;
		},
	},
	{
		header: 'Montant Restant',
		cell: ({ row }) => {
			const amount =
				parseFloat(row.getValue('FactureTotalAmount')) - parseFloat(row.getValue('clientPayment') ?? '0');

			return <div className='font-medium'>{formatCurrency(amount)}</div>;
		},
	},
	{
		accessorKey: 'FactureIssueYear',
		header: 'Année de facture',
		cell: ({ row }) => {
			return <span className=''>{row.original.FactureIssueYear}</span>;
		},
	},
	{
		accessorKey: 'factureStatus',
		header: 'Statut',
		cell: ({ row }) => {
			return row.original.factureStatus === 'payé' ? (
				<span className='text-green-500 dark:text-green-600 font-bold'>{row.original.factureStatus}</span>
			) : (
				<span className='text-destructive font-bold'>{row.original.factureStatus}</span>
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
						<DropdownMenuItem>
							<Link href={`/dashboard/clients/${row.getValue('clientId')}`}>Voir le client</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
