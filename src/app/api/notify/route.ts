import mercadopago from 'mercadopago';

mercadopago.configure({
	access_token: process.env.NEXT_ACCESS_TOKEN!,
});

export async function GET(req: any) {
	const { query } = req.json;

	const topic = query?.topic || query.type;

	console.log({ query, topic });

	try {
		if (topic === 'payment') {
			const paymentId = query?.id || query['data.id'];
			let payment = await mercadopago.payment.findById(Number(paymentId));
			let paymentStatus = payment?.body.status;

			console.log([payment, paymentStatus]);

			// Return a success response with payment status
			return new Response(JSON.stringify({ paymentStatus }), {
				status: 200,
				headers: {
					'Content-Type': 'application/json',
				},
			});
		} else {
			// Handle other cases if needed and return appropriate responses
			return new Response(JSON.stringify({ message: 'Topic not supported' }), {
				status: 400,
				headers: {
					'Content-Type': 'application/json',
				},
			});
		}
	} catch (error: any) {
		// Handle errors and return an error response
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}
}
