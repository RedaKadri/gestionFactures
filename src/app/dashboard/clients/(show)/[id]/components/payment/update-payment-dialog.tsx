import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Pencil } from 'lucide-react';
import UpdatePaymentForm from './update-payment-form';

export default function PaymentUpdateDialog({ payment }: { payment: any }) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='flex items-center gap-4  pr-[59px] pl-1 py-4 mt-1 h-5' variant='ghost'>
					<Pencil size={16} className='w-3 h-3' />
					Modifier
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Modifier Payment</DialogTitle>
					<DialogDescription>Modifier le payment ci-dessous.</DialogDescription>
				</DialogHeader>
				<UpdatePaymentForm payment={payment} />
			</DialogContent>
		</Dialog>
	);
}
