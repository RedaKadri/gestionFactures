import { RotateCw } from 'lucide-react';

function Loading() {
	return (
		<div className='flex justify-center items-center h-[80vh]'>
			<RotateCw className='animate-spin text-4xl' size={32} />
		</div>
	);
}

export default Loading;
