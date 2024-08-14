'use client';

import { useRouter } from 'next/navigation';

export const LoginForm = () => {
	const router = useRouter();

	const handleLineLogin = () => {
		router.push('http://localhost:3000/api/auth/login');
	};

	return (
		<section className='grid gap-8'>
			<h1 className='text-4xl text-center font-bold'>Login</h1>
			<button
				type='button'
				onClick={handleLineLogin}
				className='w-60 bg-emerald-400 text-white py-2 px-4 border border-emerald-400 rounded-md hover:transition-all duration-100 hover:bg-white hover:text-emerald-400'
			>
				Login with LINE
			</button>
		</section>
	);
};
