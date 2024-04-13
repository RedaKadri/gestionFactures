'use client';

import { updatePayment } from '@/actions/payment.action';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { PaymentSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

const UpdatePaymentForm = ({ payment }: { payment: any }) => {
	const router = useRouter();

	const form = useForm<z.infer<typeof PaymentSchema>>({
		resolver: zodResolver(PaymentSchema),
		defaultValues: {
			id: payment.id,
			factureId: payment.factureId,
			amount: payment.amount,
		},
	});

	async function onSubmit(values: z.infer<typeof PaymentSchema>) {
		const data: z.infer<typeof PaymentSchema> = {
			...values,
			amount: Number(values.amount),
		};
		const res = await updatePayment(data);
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
				description: 'Payment has been updated',
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
					name='amount'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Montant </FormLabel>
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

export default UpdatePaymentForm;
