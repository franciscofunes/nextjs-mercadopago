'use client';

import { MercadoPagoButton } from '@/components/MercadoPagoButton';
import { Subscription } from '@/mock/subscription';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SiPrometheus } from 'react-icons/si';

export default function Home() {
	return (
		<div className='flex items-center justify-center flex-col mt-10 lg:mt-0 dark:bg-gray-900'>
			<div className='p-4 md:p-10 w-full max-w-md relative'>
				{/* Main Card */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5, duration: 0.8 }}
					className='rounded-xl bg-zinc-200 dark:bg-[#1E293B] p-6 md:p-10 shadow-xl relative md:pb-8'
				>
					<div className='flex flex-col justify-center items-center text-center'>
						<div className='max-w-sm font-bold font-sans italic text-indigo-500'>
							{Subscription.parentCardTitle}
						</div>
						<div className='font-light max-w-lg mt-5 text-sm text-[#718096] dark:text-[#A0AEC0]'>
							{Subscription.parentCardSubtitle}
						</div>
					</div>

					{/* Inner Card */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.8, duration: 0.8 }}
						className='rounded-xl bg-[#FFFBEC] dark:bg-gray-600 mt-5 p-6 md:p-8'
					>
						<div className='flex gap-x-2'>
							<div className='font-semibold text-lg text-[#1E293B] dark:text-white'>
								{Subscription.childCardTitle}
							</div>
							<SiPrometheus className='font-semibold text-lg text-[#1E293B] dark:text-white' />
						</div>
						<div className='text-sm font-light text-[#718096] dark:text-[#A0AEC0]'>
							{Subscription.childCardSubtitle}
						</div>
						<div className='my-4'>
							<span className='font-bold text-base text-[#1E293B] dark:text-white'>
								{Subscription.price.toLocaleString('es-AR', {
									style: 'currency',
									currency: 'ARS',
								})}
							</span>
							<span className='font-light text-sm text-[#718096] dark:text-[#A0AEC0]'>
								/mes
							</span>
						</div>
						<MercadoPagoButton subscription={Subscription} />
					</motion.div>

					{/* Image in the bottom right corner */}
					<motion.div
						initial={{ opacity: 0, x: 50, y: 50 }}
						animate={{ opacity: 1, x: 0, y: 0 }}
						transition={{ delay: 0.8, duration: 0.8 }}
						className='absolute bottom-0 right-0 h-24 w-24 md:h-32 md:w-32 overflow-hidden'
					>
						<Image
							src={Subscription.image}
							alt='safe'
							className='w-full h-full object-cover'
						/>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
}
