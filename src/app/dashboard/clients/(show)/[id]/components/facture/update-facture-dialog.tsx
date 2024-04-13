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
import FactureUpdateForm from './update-facture-form';

export default function FactureUpdateDialog({ facture }: { facture: any }) {
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
					<DialogTitle>Modifier Facture</DialogTitle>
					<DialogDescription>Modifier la facture ci-dessous.</DialogDescription>
				</DialogHeader>
				<FactureUpdateForm facture={facture} />
			</DialogContent>
		</Dialog>
	);
}
