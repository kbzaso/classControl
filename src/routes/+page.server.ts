import { auth } from '$lib/server/lucia';
import { LuciaError } from 'lucia';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions } from './$types';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6).max(24)
});

export const load = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) throw redirect(302, '/horarios');
	const form = superValidate(loginSchema);
	return { form };
};

export const actions: Actions = {
	login: async (event) => {
		const form = await superValidate(event, loginSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const email = form.data.email;
		const password = form.data.password;


		try {
			// find user by key
			// and validate password
			const user = await auth.useKey(
				"username",
				email.toLowerCase(),
				password
			);
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});
			event.locals.auth.setSession(session); // set session cookie
		} catch (e) {
			if (
				e instanceof LuciaError &&
				(e.message === "AUTH_INVALID_KEY_ID" ||
					e.message === "AUTH_INVALID_PASSWORD")
			) {
				// user does not exist
				// or invalid password
				return setError(form, 'password', 'Usuario o clave incorrecta');
			}
			return fail(500, {
				form
			});
		}
		// // redirect to
		// // make sure you don't throw inside a try/catch block!
		throw redirect(302, "/horarios");
	}
};
