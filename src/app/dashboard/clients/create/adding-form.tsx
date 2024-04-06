'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { ClientSchema } from '@/types';
import { addClient } from '@/actions/client.action';

const AddingForm = () => {
	const router = useRouter();

	const form = useForm<z.infer<typeof ClientSchema>>({
		resolver: zodResolver(ClientSchema),
		defaultValues: {
			id: '',
			name: '',
			tel: '',
		},
	});

	async function onSubmit(values: z.infer<typeof ClientSchema>) {
		const res = await addClient(values);
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
				description: 'Client has been added',
			});

			router.push(`/dashboard/clients/${res.id}`);
		}
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
				<FormField
					control={form.control}
					name='id'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Code</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nom</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='tel'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tél</FormLabel>
							<FormControl>
								<Input {...field} type='tel' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' className='w-full'>
					Ajouter
				</Button>
			</form>
		</FormProvider>
	);
};

export default AddingForm;
