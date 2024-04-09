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
import ClientEdit from './update-client-form';

export default function ClientUpdateDialog({ client }: { client: any }) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='flex items-center gap-2'>
					<Pencil size={16} className='w-3 h-3' />
					Modifier
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Modifier Client</DialogTitle>
					<DialogDescription>Modifier le client ci-dessous.</DialogDescription>
				</DialogHeader>
				<ClientEdit client={client} />
			</DialogContent>
		</Dialog>
	);
}
