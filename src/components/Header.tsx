'use client';

import { AlignLeft, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { ModeToggle } from './mode-toggle';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { signOut } from '@/actions/auth.action';
import Link from 'next/link';

function Header() {
	return (
		<header className='flex items-center justify-between sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-12 px-3 py-3'>
			<div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant={'outline'} size={'icon'}>
							<AlignLeft />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align='start'
						className='border border-secondary rounded-md p-1 m-2 ms-0 w-32 bg-background'
					>
						<DropdownMenuItem className='hover:bg-secondary outline-none rounded-md px-2 py-1'>
							<Link href={'/dashboard/clients'}>Clients</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className='hover:bg-secondary outline-none rounded-md px-2 py-1'>
							<Link href={'/dashboard/factures'}>Factures</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<Link href={'/dashboard'} className='cursor-pointer'>
				<Button variant='ghost' className='text-2xl font-bold ms-10'>
					GDC
				</Button>
			</Link>
			<div className='flex justify-center gap-4'>
				<form action={signOut}>
					<Button variant='ghost' size={'icon'} type='submit'>
						<LogOut />
					</Button>
				</form>
				<ModeToggle />
			</div>
		</header>
	);
}

export default Header;
