import type { Actions, PageServerLoad } from './$types';
import { client } from '$lib/server/lucia';
import { z } from 'zod';
import { message, superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import type { Plan } from '@prisma/client';
import { PLAN } from '$lib/constants/const';

const deleteUserSchema = z.object({
	id: z.string().min(1)
});
const updateUserSchema = z.object({
	level: z.string()
});

const paymentSchema = z.object({
	id: z.string(),
	amount: z.number(),
	expire: z.date(),
	plan: z.string()
});

export const load: PageServerLoad = async ({ params }) => {
	const user = await client.user.findUnique({
		where: {
			id: params.slug
		}
	});

	const lastPayment = await client.payment.findFirst({
		where: {
			user: {
				id: params.slug
			}
		},
		orderBy: {
			expiresAt: 'desc'
		}
	});

	const DELETE_USER_FORM = await superValidate(deleteUserSchema, {
		id: '1'
	});
	const UPDATE_USER_FORM = await superValidate(user, updateUserSchema, {
		id: '2'
	});

	const formAddPayment = await superValidate(user, paymentSchema, {
		id: '3'
		});

	return { user, DELETE_USER_FORM, UPDATE_USER_FORM, formAddPayment, lastPayment};
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const formData = await request.formData();

		const deleteForm = await superValidate(formData, deleteUserSchema);

		const id = formData.get('id');

		if (!deleteForm.valid) return fail(400, { deleteForm });

		await client.user.delete({
			where: {
				id: String(id)
			}
		});
		throw redirect(302, '/alumnos');
	},
	update: async (event) => {
		const session = await event.locals.auth.validate();
		const formData = await event.request.formData();

		const updateForm = await superValidate(formData, updateUserSchema);
		const id = formData.get('id');
		const level = formData.get('level');

		if (!updateForm.valid) return fail(400, { updateForm });

		try {
			const user = await client.user.update({
				where: {
					id: id
				},
				data: {
					level
				}
			});
			return {
				user,
				updateForm
			};
		} catch (error) {
			console.log(error);
		}
	},
	addPayment: async (event) => {
		const formData = await event.request.formData();

		const formAddPayment = await superValidate(formData, paymentSchema);

		const id = formData.get('id');
		const amount = formData.get('amount');
		const date = formData.get('expire');
		const plan = formData.get('plan') as string;
		const expire = new Date(date).toISOString();

		let classToAdd = 0;
		if(plan === PLAN.FOUR) classToAdd = 4;
		if(plan === PLAN.EIGHT) classToAdd = 8;
		if(plan === PLAN.TWELVE) classToAdd = 12;
		if(plan === PLAN.SIXTEEN) classToAdd = 16;

		if (!formAddPayment.valid) return fail(400, { formAddPayment });

		try {
			const newPayment = await client.payment.create({
				data: {
					amount: Number(amount),
					expiresAt: expire,
					plan: plan as Plan,
					user: {
						connect: {
							id: id
						}
					}
				}
			});

			const user = await client.user.update({
				where: {
					id: id
				},
				data: {
					classesRemaining: {
						increment: classToAdd
					}
				}
			});

			return {
				user,
				newPayment,
				formAddPayment,
				success: true,
				message: 'Pago agregado'
			};
		} catch (error) {
			return console.log(error);
		}
	},
};
