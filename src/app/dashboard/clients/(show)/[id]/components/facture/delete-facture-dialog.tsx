'use client';

import { deleteFacture } from '@/actions/facture.action';
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

export default function FactureDeleteDialog({ id }: { id: string }) {
	const router = useRouter();

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='flex items-center gap-4 pl-1 pr-[46px] py-4 h-5 text-destructive' variant='ghost'>
					<Trash2 size={16} className='w-3 h-3' />
					Supprimer
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Supprimer facture</DialogTitle>
					<DialogDescription>
						Cet action permette de supprimer la facture et toutes ses payments.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogTrigger asChild>
						<form
							onSubmit={async (e) => {
								e.preventDefault();
								const res = await deleteFacture(id);
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
										description: 'Facture has been deleted',
									});

									router.refresh();
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
