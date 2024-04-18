'use client';

import { updateClient } from '@/actions/client.action';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { ClientSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

const ClientUpdateForm = ({ client }: { client: any }) => {
	const router = useRouter();

	const form = useForm<z.infer<typeof ClientSchema>>({
		resolver: zodResolver(ClientSchema),
		defaultValues: {
			id: client.id,
			name: client.name,
			tel: client.tel,
		},
	});

	async function onSubmit(values: z.infer<typeof ClientSchema>) {
		const res = await updateClient(values);
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
				description: 'Client has been updated',
			});

			router.refresh();
		}
	}
	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='id'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Code</FormLabel>
							<FormControl>
								<Input {...field} disabled />
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
					Sauvegarder
				</Button>
			</form>
		</FormProvider>
	);
};

export default ClientUpdateForm;
