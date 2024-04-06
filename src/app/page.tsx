import { redirect } from 'next/navigation';

export default function Home() {
	redirect('/dashboard');

	return (
		<>
			<main className='h-screen'>
				<h1 className='text-2xl font-bold text-center'>Welcome</h1>
			</main>
		</>
	);
}
