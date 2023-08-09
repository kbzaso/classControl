import { fail, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';
import { auth, client } from '$lib/server/lucia';
import { LuciaError } from 'lucia';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const addUserSchema = z.object({
	first_name: z.string().min(6),
	last_name: z.string().min(6),
	email: z.string().email(),
	password: z.string().min(6).max(24),
	plan: z.string()
});

const deleteUserSchema = z.object({
	id: z.string().min(1)
});

export const load: PageServerLoad = async ({ locals }) => {

	const session = await locals.auth.validate();
	if (!session) throw redirect(302, "/");


	const ADD_USER_FORM = superValidate(addUserSchema);
	const DELETE_USER_FORM = superValidate(deleteUserSchema);

	const users = await client.user.findMany({
		select: {
			id: true,
			first_name: true,
			last_name: true,
			email: true,
			role: true
		}
	});
	
	return {
		users,
		session,
		ADD_USER_FORM,
		DELETE_USER_FORM
	};
};

export const actions: Actions = {

	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		await client.user.delete({
			where: {
				id: String(id)
			}
		});
	},

	addUser: async ( event ) => {
		const form = await superValidate(event, addUserSchema);

		const first_name = form.data.first_name;
		const last_name = form.data.last_name;
		const email = form.data.email;
		const password = form.data.password;
		const plan = form.data.plan;

		try {
			await auth.createUser({
				key: {
					providerId: "username", // auth method
					providerUserId: email.toLowerCase(), // unique id when using "username" auth method
					password // hashed by Lucia
				},
				attributes: {
					first_name,
					last_name,
					email,
					plan
				}
			});
		} catch (e) {
			// this part depends on the database you're using
			// check for unique constraint error in user table
			if (
				e instanceof PrismaClientKnownRequestError 
			) {
				return setError(form, 'email', 'Correo ya registrado');
			}
			return setError(form, 'password', 'Ocurrio un error inesperado');
		}
	}
};
