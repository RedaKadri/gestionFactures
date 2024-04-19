import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Format the given amount as a currency string.
 *
 * @param {number} amount - The amount to format.
 *
 * @return {string} - The formatted amount as a currency string.
 */
export const formatCurrency = (amount: number): string => {
	// Format the given amount as a currency string using the en-US locale and the
	// Moroccan Dirham currency.
	return new Intl.NumberFormat('en-US', {
		style: 'currency', // Use currency formatting.
		currency: 'MAD', // Use the Moroccan Dirham currency.
	}).format(amount); // The amount to format.
};
