'use client';

export const LoginForm = () => {
	const handleLineLogin = async () => {
		const channelId = process.env.NEXT_PUBLIC_LINE_CHANNEL_ID as string;
		const redirectUrl = process.env.NEXT_PUBLIC_LINE_REDIRECT_URL as string;
		const encodedRedirectUri = encodeURIComponent(redirectUrl);
		const state = process.env.NEXT_PUBLIC_LINE_STATE as string;
		const loginUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${channelId}&redirect_uri=${encodedRedirectUri}&state=${state}&scope=profile%20openid%20email`;

		window.location.href = loginUrl;
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
