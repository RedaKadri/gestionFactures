'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RegisterSchema } from '@/types';
import { signUp } from '@/actions/auth.action';
import { toast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const RegisterForm = () => {
	const router = useRouter();

	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			username: '',
			password: '',
			confirmPassword: '',
		},
	});

	async function onSubmit(values: z.infer<typeof RegisterSchema>) {
		const res = await signUp(values);
		if (res.error) {
			toast({
				title: 'Error',
				description: res.error,
				variant: 'destructive',
			});
		}
		if (res.success) {
			toast({
				title: 'Success',
				description: 'Signed up successfully',
			});

			router.push('/');
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder='admin' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input placeholder='*****' type='password' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='confirmPassword'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input placeholder='*****' type='password' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' className='w-full'>
					Create an account
				</Button>
				<div className='mt-4 text-center text-sm'>
					Already have an account?{' '}
					<Link href='/login' className='underline'>
						Sign in
					</Link>
				</div>
			</form>
		</Form>
	);
};

export default RegisterForm;
