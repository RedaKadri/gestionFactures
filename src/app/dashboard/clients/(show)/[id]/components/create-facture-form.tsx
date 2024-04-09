'use client';

import { createFacture } from '@/actions/facture.action';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { FacutreSchema } from '@/types';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

const CreateFactureForm = ({ client }: { client: any }) => {
	const router = useRouter();

	const form = useForm({
		defaultValues: {
			id: '',
			clientId: client.id,
			totalAmount: 0,
			issueYear: new Date().getFullYear(),
		},
	});

	async function onSubmit(values: z.infer<typeof FacutreSchema>) {
		const data: z.infer<typeof FacutreSchema> = {
			...values,
			totalAmount: Number(values.totalAmount),
			issueYear: Number(values.issueYear),
		};
		const res = await createFacture(data);
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
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='totalAmount'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Montant Total</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='issueYear'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Année</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' className='w-full'>
					Create
				</Button>
			</form>
		</FormProvider>
	);
};

export default CreateFactureForm;
