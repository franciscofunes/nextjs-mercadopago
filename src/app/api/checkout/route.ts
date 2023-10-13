import { ISubscription } from '@/mock/subscription';
import mercadopago from 'mercadopago';

import { CreatePreferencePayload } from 'mercadopago/models/preferences/create-payload.model';

mercadopago.configure({
	access_token: process.env.NEXT_ACCESS_TOKEN!,
});

export async function POST(req: Request) {
	if (req.method === 'POST') {
		const requestBody: { subscription: ISubscription } = await req.json();

		if (requestBody && requestBody.subscription) {
			const subscription = requestBody.subscription;

			const URL_SUCCESS =
				process.env.NODE_ENV === 'development'
					? 'http://localhost:3000/pago-exitoso'
					: 'https://your-production-url/pago-exitoso';

			const URL_FAILED =
				process.env.NODE_ENV === 'development'
					? 'http://localhost:3000/pago-fallido'
					: 'https://your-production-url/pago-fallido';

			const URL_NEXT_API =
				process.env.NODE_ENV === 'development'
					? 'http://localhost:3006'
					: 'https://ltc-subscripcion.vercel.app/';

			try {
				const preference: CreatePreferencePayload = {
					items: [
						{
							title: subscription.childCardTitle,
							unit_price: subscription.price,
							quantity: 1,
						},
					],
					auto_return: 'approved',
					back_urls: {
						success: `${URL_SUCCESS}`,
						failure: `${URL_FAILED}`,
					},
					notification_url: `${URL_NEXT_API}/api/notify`,
				};

				const response = await mercadopago.preferences.create(preference);

				return new Response(JSON.stringify({ url: response.body.init_point }), {
					status: 200,
					headers: {
						'Content-Type': 'application/json',
					},
				});
			} catch (error) {
				return new Response(
					JSON.stringify({
						error: 'An error occurred while creating the preference.',
					}),
					{
						status: 500,
						headers: {
							'Content-Type': 'application/json',
						},
					}
				);
			}
		} else {
			return new Response(JSON.stringify({ error: 'Invalid request body' }), {
				status: 400,
				headers: {
					'Content-Type': 'application/json',
				},
			});
		}
	} else {
		return new Response(JSON.stringify({ error: 'Method not allowed' }), {
			status: 405,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}
}
