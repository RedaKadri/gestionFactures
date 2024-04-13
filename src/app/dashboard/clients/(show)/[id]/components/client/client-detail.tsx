import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FilePlus2, KeyRound, Phone, User, UserCheck } from 'lucide-react';
import ClientUpdateDialog from './update-client-dialog';
import ClientDeleteDialog from './delete-client-dialog';
import FactureCreateDialog from '../facture/create-facture-dialog';

export default function ClientDetail({ client }: { client: any }) {
	return (
		<div className='min-w-[350px] mt-12 flex 2xl:flex-col gap-5 justify-center items-center'>
			<Card className='w-full'>
				<CardHeader>
					<CardTitle>
						<p className='flex gap-1 items-center'>
							<UserCheck />
							<span>Client details</span>
						</p>
					</CardTitle>
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
					<ClientUpdateDialog client={client} />
					<ClientDeleteDialog id={client.id} />
				</CardFooter>
			</Card>
			<Card className='w-full'>
				<CardHeader>
					<CardTitle>
						<p className='flex gap-1 items-center'>
							<FilePlus2 />
							<span>Ajouter facture</span>
						</p>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p>Ajouter une facture pour ce client</p>
				</CardContent>
				<CardFooter className='flex justify-end items-center gap-3'>
					<FactureCreateDialog client={client} />
				</CardFooter>
			</Card>
		</div>
	);
}
