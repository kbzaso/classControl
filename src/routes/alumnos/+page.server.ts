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
	plan: z.string().min(1),
	level: z.string().min(1)
});


export const load: PageServerLoad = async ({ locals }) => {

	const session = await locals.auth.validate();
	if (!session) throw redirect(302, "/");

	const form = superValidate(addUserSchema);

	const users = await client.user.findMany({
		select: {
			id: true,
			first_name: true,
			last_name: true,
			email: true,
			level: true,
		},
		where: {
			role: {
				equals: "USER"
			}
		}
	});
	
	return {
		users,
		session,
		form,
	};
};

export const actions: Actions = {
	default: async ( event ) => {
		const form = await superValidate(event, addUserSchema);

		const first_name = form.data.first_name;
		const last_name = form.data.last_name;
		const email = form.data.email;
		const password = form.data.password;
		const level = form.data.level;
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
					plan,
					level
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
