'use client';

import { SWRConfig } from 'swr';

/**
 * Wraps children in an SWRConfig component
 *
 * The SWRConfig component is a provider that allows you to set
 * default configurations for all swr() hooks in its child components.
 *
 * See https://swr.vercel.app/docs/global-configuration for more info.
 */
export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
	/**
	 * The SWRConfig component (from the swr library)
	 *
	 * @param props The SWRConfig props
	 * @returns A div wrapping the children, with an SWRConfig component inside
	 */
	return (
		<SWRConfig>
			{/* SWRConfig requires a single child element. We'll wrap the children in a div to satisfy this. */}
			<div>{children}</div>
		</SWRConfig>
	);
};
