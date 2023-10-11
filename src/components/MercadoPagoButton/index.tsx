import { useEffect, useState } from 'react';
import { ISubscription } from '@/mock/subscription';
import { Loader } from '../Loader';
import axios from 'axios';

interface MercadoPagoButtonProps {
	subscription: ISubscription;
}

export const MercadoPagoButton = ({ subscription }: MercadoPagoButtonProps) => {
	const [url, setUrl] = useState<null | string>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const generateLink = async () => {
			setLoading(true);

			try {
				const { data: preference } = await axios.post('/api/checkout', {
					subscription,
				});

				setUrl(preference.url);
			} catch (error) {
				console.error(error);
			}

			setLoading(false);
		};

		generateLink();
	}, [subscription]);

	return (
		<div>
			{loading ? (
				<button
					className='lg:mt-10 mt-6 flex justify-center w-36 border-0 rounded-lg bg-indigo-500 font-bold text-white px-4 py-3 transition-shadow duration-300 ease-in hover:shadow-primary'
					disabled
				>
					<Loader />
				</button>
			) : (
				<a
					href={url!}
					target='
          _blank'
					className='lg:mt-10 mt-6 flex justify-center w-36 border-0 rounded-lg bg-indigo-500 font-bold text-white px-4 py-3 transition-shadow duration-300 ease-in hover:shadow-primary'
				>
					Contratar
				</a>
			)}
		</div>
	);
};
