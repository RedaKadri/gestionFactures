import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { HandCoins, Plus } from 'lucide-react';
import CreatePaymentForm from './create-payment-form';

export default function PaymentCreateDialog({ factureId }: { factureId: string }) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='flex items-center gap-3 pr-3 pl-1 py-4 mt-1 h-5' variant='ghost'>
					<HandCoins size={16} />
					Ajouté payment
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Ajouté payment</DialogTitle>
					<DialogDescription>Ajouter un payment pour cette facture.</DialogDescription>
				</DialogHeader>
				<CreatePaymentForm factureId={factureId} />
			</DialogContent>
		</Dialog>
	);
}
