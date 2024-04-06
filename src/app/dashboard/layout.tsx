import Header from '@/components/Header';
import { SWRProvider } from '../swr-provider';

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SWRProvider>
			<Header />
			<main className='container'>{children}</main>
		</SWRProvider>
	);
}
