'use client';

import { updateFacture } from '@/actions/facture.action';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { FacutreSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

const UpdateFactureForm = ({ facture }: { facture: any }) => {
	const router = useRouter();

	const form = useForm<z.infer<typeof FacutreSchema>>({
		resolver: zodResolver(FacutreSchema),
		defaultValues: {
			id: facture.id,
			clientId: facture.clientId,
			totalAmount: facture.totalAmount,
			issueYear: facture.issueYear,
		},
	});

	async function onSubmit(values: z.infer<typeof FacutreSchema>) {
		const data: z.infer<typeof FacutreSchema> = {
			...values,
			totalAmount: Number(values.totalAmount),
			issueYear: Number(values.issueYear),
		};
		const res = await updateFacture(data);
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
				description: 'Facture has been updated',
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
					Enregistrer
				</Button>
			</form>
		</FormProvider>
	);
};

export default UpdateFactureForm;
