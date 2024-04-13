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

export const columns0: ColumnDef<any>[] = [
	{
		id: 'id',
		accessorKey: 'id',
		header: 'Code',
	},
	{
		accessorKey: 'clientName',
		header: 'Nom',
	},
	{
		accessorKey: 'tel',
		header: 'Tél',
	},
	{
		accessorKey: 'updatedAt',
		header: 'Date de modification',
		cell: ({ row }) => (row.getValue('updatedAt') as string).slice(0, 16),
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
							<Link href={`/dashboard/clients/${row.getValue('id')}`}>Voir le client</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
