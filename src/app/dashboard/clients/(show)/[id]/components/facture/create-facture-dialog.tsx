import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import CreateFacture from './create-facture-form';
import { Plus } from 'lucide-react';

export default function FactureCreateDialog({ client }: { client: any }) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='flex items-center gap-2'>
					<Plus size={16} />
					Ajouté
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Ajouté facture</DialogTitle>
					<DialogDescription>Ajouter une facture pour le client.</DialogDescription>
				</DialogHeader>
				<CreateFacture client={client} />
			</DialogContent>
		</Dialog>
	);
}
