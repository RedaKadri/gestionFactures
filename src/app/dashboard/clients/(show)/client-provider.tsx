'use client';

import { createContext, useState } from 'react';

export const ClientContext = createContext<object | null>(null);

export function ClientProvider({ children }: { children: React.ReactNode }) {
	const [clientName, setClientName] = useState<string | null>(null);

	const updateClientName = (name: string) => setClientName(name);

	return <ClientContext.Provider value={{ clientName, updateClientName }}>{children}</ClientContext.Provider>;
}
