import { fail, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';
import { auth, client } from '$lib/server/lucia';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import { LuciaError } from 'lucia';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { supabase } from '$lib/server/supabase';
import type { Plan } from '@prisma/client';

const updateSchema = z.object({
	first_name: z.string(),
	last_name: z.string(),
	plan: z.string(),
});

const updateAvatarSchema = z.object({
	avatar: z.string(),
});

function generateRandomFilename(extension: string): string {
	const timestamp = Date.now();
	const randomNumber = Math.floor(Math.random() * 1000000);
	return `${timestamp}-${randomNumber}.${extension}`;
  }

export const load: PageServerLoad = async ( event ) => {
	const session = await event.locals.auth.validate();
	if (!session) throw redirect(302, '/');

	// bring my user info from the database
	const user = await client.user.findUnique({
		where: {
			id: session?.user?.userId
		}
	});

	const lastPayment = await client.payment.findFirst({
		where: {
			user: {
				id: session.user.userId
			}
		},
		orderBy: {
			expiresAt: 'desc'
		}
	});

	// Rellena con información de la BD el formulario
	const form = superValidate(user, updateSchema);

	const formAvatar = superValidate(user, updateAvatarSchema);

	return {
		user,
		userId: session.user.userId,
		form,
		formAvatar,
		lastPayment
	};
};

export const actions: Actions = {
	updateAvatar: async (event) => {
		const session = await event.locals.auth.validate();
		const formData = await event.request.formData();
		const formAvatar = await superValidate(formData, updateAvatarSchema);

		if (!formAvatar.valid) {
			return fail(400, {
				formAvatar
			});
		}

		const avatarFile = formData.get('file') as File;
		console.log(avatarFile);
		const mimeType = avatarFile?.type;
		const parts = mimeType.split('/');
		const subtype = parts[1];

		const filename = generateRandomFilename(subtype);

		
		if (avatarFile instanceof File) {
		try {
			// upload profile image to supabase storage
			const { data } = await supabase.storage
				.from('profiles')
				.upload(`${session?.user?.userId}/${filename}`, avatarFile as File, {
					cacheControl: '3600',
					upsert: true
			});

			const user = await client.user.update({
				where: {
					id: session?.user?.userId
				},
				data: {
					avatarUrl: data?.path
				}
			});
			return {
				success: true, message: 'Avatar actualizado', user, formAvatar
			};
		} catch (e) {
			if (e instanceof LuciaError || e instanceof PrismaClientKnownRequestError) {
				// user does not exist
				// or invalid password
				return setError(formAvatar, '', 'File o clave incorrecta');
			}
			return fail(500, {
				formAvatar
			});
		}
	}
	},
	update: async (event) => {
		const session = await event.locals.auth.validate();
		const formData = await event.request.formData();
		const form = await superValidate(formData, updateSchema);

		const first_name = form.data.first_name;
		const last_name = form.data.last_name;
		const plan = form.data.plan || 'FOUR';
		

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
					last_name,
					plan: plan as Plan,
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
