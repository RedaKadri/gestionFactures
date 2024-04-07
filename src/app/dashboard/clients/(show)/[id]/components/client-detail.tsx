import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { KeyRound, Phone, User } from 'lucide-react';
import { ClientEditDialog } from './client-dialog';
import { ClientDelete } from './client-delete';

export default function ClientDetail({ client }: { client: any }) {
	return (
		<Card className='min-w-[340px] mt-12'>
			<CardHeader>
				<CardTitle>Client details</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='flex flex-col gap-3'>
					<p className='flex gap-1 items-center'>
						<span className='flex gap-1 items-center dark:text-zinc-400 text-zinc-900'>
							<KeyRound size={16} />
							Code :
						</span>
						<span className='font-mono'>{client.id}</span>
					</p>
					<p className='flex gap-1 items-center'>
						<span className='flex gap-1 items-center dark:text-zinc-400 text-zinc-900'>
							<User size={16} /> Nom :
						</span>
						<span className='font-mono'>{client.name}</span>
					</p>
					<p className='flex gap-1 items-center'>
						<span className='flex gap-1 items-center dark:text-zinc-400 text-zinc-900'>
							<Phone size={16} /> Tél :
						</span>
						<span className='font-mono'>{client.tel}</span>
					</p>
				</div>
			</CardContent>
			<CardFooter className='flex justify-end items-center gap-3'>
				<ClientEditDialog client={client} />
				<ClientDelete id={client.id} />
			</CardFooter>
		</Card>
	);
}
