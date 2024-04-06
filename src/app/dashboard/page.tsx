import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Archive, ArchiveRestore, UserRoundPlus, UsersRound } from 'lucide-react';
import NavigationCard from '@/components/NavigationCard';

const CardInfo = [
	{
		title: 'Ajouter un Client',
		icon: <UserRoundPlus />,
		content: 'Enregistrez un nouveau client dans votre base de données.',
		link: '/dashboard/clients/create',
		action: 'Ajouter un Client',
	},
	{
		title: 'Gérer les Clients',
		icon: <UsersRound />,
		content: 'Visualisez et modifiez les informations clients.',
		link: '/dashboard/clients',
		action: 'Accéder aux Clients',
	},
	{
		title: 'Créer une Facture',
		icon: <ArchiveRestore />,
		content: 'Générez une nouvelle facture pour un client.',
		link: '/dashboard/factures/create',
		action: 'Créer une Facture',
	},
	{
		title: 'Gérer les Factures',
		icon: <Archive />,
		content: 'Gérez et visualisez vos factures clients.',
		link: '/dashboard/factures',
		action: 'Accéder aux Factures',
	},
];

async function Dashboard() {
	const { user } = await validateRequest();
	if (!user) {
		return redirect('/login');
	}
	return (
		<main>
			<h1 className='text-4xl font-bold m-4 ms-0 font-mono'>Navigation</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4 m-2'>
				{CardInfo.map((card) => (
					<NavigationCard key={card.title} {...card} />
				))}
			</div>
		</main>
	);
}

export default Dashboard;
