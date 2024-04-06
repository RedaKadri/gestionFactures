import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ReactNode } from 'react';

interface NavigationCardProps {
	title: string;
	content: string;
	icon: ReactNode;
	link: string;
	action: string;
}

function NavigationCard({ title, content, icon, link, action }: NavigationCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='flex gap-1 items-center'>
					{icon}
					<span>{title}</span>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p className='ms-2'>{content}</p>
			</CardContent>
			<CardFooter className='justify-end'>
				<Link href={link}>
					<Button variant='outline'>{action}</Button>
				</Link>
			</CardFooter>
		</Card>
	);
}

export default NavigationCard;
