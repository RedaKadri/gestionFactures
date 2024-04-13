'use client';

import { deletePayment } from '@/actions/payment.action';
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

export default function PaymentDeleteDialog({ id }: { id: string }) {
	const router = useRouter();

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='flex items-center gap-4 pl-1 pr-12 py-4 h-5 text-destructive' variant='ghost'>
					<Trash2 size={16} className='w-3 h-3' />
					Supprimer
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Supprimer payment</DialogTitle>
					<DialogDescription>Cet action permette de supprimer le payment.</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogTrigger asChild>
						<form
							onSubmit={async (e) => {
								e.preventDefault();
								const res = await deletePayment(id);
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
										description: 'Payment has been deleted',
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
