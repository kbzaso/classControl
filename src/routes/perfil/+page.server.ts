import { fail, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';
import { auth, client } from '$lib/server/lucia';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import { LuciaError } from 'lucia';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const updateSchema = z.object({
	first_name: z.string().min(3),
	last_name: z.string().min(3),
});

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	const form = superValidate(updateSchema);

	// bring my user info from the database
	const user = await client.user.findUnique({
		where: {
			id: session?.user?.userId
		}
	});

	if (!session) throw redirect(302, '/');
	return {
		user,
		userId: session.user.userId,
		form,
	};
};

export const actions: Actions = {
	update: async ( event ) => {
		const session = await event.locals.auth.validate();
		const form = await superValidate(event.request, updateSchema);

		const first_name = form.data.first_name;
		const last_name = form.data.last_name;

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			const user = await client.user.update({
				where: {
					id: session?.user?.userId
				},
				data: {
					first_name,
					last_name
				}
			});
			return {
				form,
				user
			}
		} catch (e) {
			if (
				e instanceof LuciaError || e instanceof PrismaClientKnownRequestError
			) {
				// user does not exist
				// or invalid password
				return setError(form, 'first_name', 'Usuario o clave incorrecta');
			}
			return fail(500, {
				form
			});
		}
	}
};
