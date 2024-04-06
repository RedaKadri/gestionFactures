import LoginForm from '@/components/auth/Login';
import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Login() {
	const { user } = await validateRequest();

	if (user) {
		return redirect('/dashboard');
	}

	return (
		<div className='w-full flex justify-center items-center min-h-screen'>
			<div className='flex items-center justify-center py-12'>
				<div className='mx-auto grid w-[350px] gap-6'>
					<div className='grid gap-2 text-center'>
						<h1 className='text-3xl font-bold'>Login</h1>
						<p className='text-balance text-muted-foreground'>
							Enter your username below to login to your account
						</p>
					</div>
					<LoginForm />
				</div>
			</div>
		</div>
	);
}
