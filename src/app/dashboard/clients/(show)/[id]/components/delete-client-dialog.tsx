'use client';

import { deleteClient } from '@/actions/client.action';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default async function ClientDeleteDialog({ id }: { id: string }) {
	const router = useRouter();

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='flex items-center gap-2' variant='destructive'>
					<Trash2 size={16} className='w-3 h-3' />
					Supprimer
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Supprimer client</DialogTitle>
					<DialogDescription>
						Cet action permette de supprimer le client et toutes ses factures et payments.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogTrigger asChild>
						<form
							onSubmit={async (e) => {
								e.preventDefault();
								const res = await deleteClient(id);
								if (res.error) {
									toast({
										title: 'Error',
										description: res.error,
										variant: 'destructive',
									});
								}
								if (res.success) {
									toast({
										title: 'Success',
										description: 'Client has been deleted',
									});

									router.push('/dashboard/clients');
								}
							}}
						>
							<Button variant='destructive' type='submit'>
								Supprimer
							</Button>
						</form>
					</DialogTrigger>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
