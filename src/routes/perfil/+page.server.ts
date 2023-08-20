import { fail, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';
import { auth, client } from '$lib/server/lucia';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import { LuciaError } from 'lucia';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { supabase } from '$lib/server/supabase';

const updateSchema = z.object({
	first_name: z.string(),
	last_name: z.string(),
	plan: z.string(),
	avatar: z.string()
});

export const load: PageServerLoad = async ({ locals, depends }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/');

	// bring my user info from the database
	const user = await client.user.findUnique({
		where: {
			id: session?.user?.userId
		}
	});

	// Rellena con información de la BD el formulario
	const form = superValidate(user, updateSchema);

	return {
		user,
		userId: session.user.userId,
		form
	};
};

export const actions: Actions = {
	update: async (event) => {
		const session = await event.locals.auth.validate();
		const formData = await event.request.formData();
		const form = await superValidate(formData, updateSchema);

		const first_name = form.data.first_name;
		const last_name = form.data.last_name;
		const plan = form.data.plan || 'FOUR';
		const avatarFile = formData.get('file');

		const mimeType = avatarFile?.type;
		const parts = mimeType.split('/');
		const subtype = parts[1];

		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		try {
			// upload profile image to supabase storage

			const { data, error } = await supabase.storage
				.from('profiles')
				.upload(`${session?.user?.userId}/avatar.${subtype}`, avatarFile, {
					cacheControl: '3600',
					upsert: true
				});

			const user = await client.user.update({
				where: {
					id: session?.user?.userId
				},
				data: {
					first_name,
					last_name,
					plan,
					avatarUrl: data.path
				}
			});
			return {
				form,
				user
			};
		} catch (e) {
			if (e instanceof LuciaError || e instanceof PrismaClientKnownRequestError) {
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
