import payOnline from '../../public/assets/payOnline.svg';

export interface ISubscription {
	id: string;
	parentCardTitle: string;
	parentCardSubtitle: string;
	childCardTitle: string;
	childCardSubtitle: string;
	price: number;
	image: string;
}

const subscriptionId = crypto.randomUUID();

export const Subscription: ISubscription = {
	id: subscriptionId,
	parentCardTitle:
		'Experimenta lo mejor de nuestra aplicación con una Suscripción Premium',
	parentCardSubtitle:
		'La suscripción Premium te ofrece una experiencia sin publicidad de nuestra aplicación',
	childCardTitle: 'Premium Pack',
	childCardSubtitle: 'Libre de anuncios',
	price: 2500,
	image: payOnline,
};
