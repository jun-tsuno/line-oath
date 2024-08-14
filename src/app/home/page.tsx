import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Image from 'next/image';

const HomePage = () => {
	const cookieStore = cookies();
	const profileCookie = cookieStore.get('lineProfile');
	const profile = profileCookie ? JSON.parse(profileCookie.value) : null;

	if (!profile) return notFound();

	return (
		<>
			<article className='min-h-screen grid place-content-center place-items-center'>
				<h1 className='text-4xl font-bold'>WELCOME!</h1>
				<div className='mt-8 font-semibold'>
					Login User: {profile.displayName}
				</div>
				<figure className='mt-3'>
					<Image
						src={profile.pictureUrl}
						alt={profile.displayName || 'User Picture'}
						width={100}
						height={100}
						priority
					/>
				</figure>
			</article>
		</>
	);
};

export default HomePage;
