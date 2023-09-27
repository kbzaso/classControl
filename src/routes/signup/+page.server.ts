import { auth } from "$lib/server/lucia";
import { fail, json, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { LuciaError } from "lucia";

import type { PageServerLoad, Actions } from "./$types";
import { z } from 'zod';

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6).max(24)
});

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) throw redirect(302, "/horarios");
	const form = superValidate(loginSchema);
	return { form };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();

		const form = await superValidate(formData, loginSchema);

		const first_name = formData.get("first_name");
		const last_name = formData.get("last_name");
		const plan = formData.get("plan");
		const email = formData.get("email");
		const password = formData.get("password");

		try {
			await auth.createUser({
				key: {
					providerId: "username", // auth method
					providerUserId: email?.toLowerCase(), // unique id when using "username" auth method
					password // hashed by Lucia
				},
				attributes: {
					email,
					first_name,
					last_name,
					plan
				}
			});
			return {
				success: true, message: 'new student', form
			};
		} catch (e) {
			// this part depends on the database you're using
			// check for unique constraint error in user table
			console.log(e);
			if (
				e instanceof LuciaError
			) {
				return fail(400, {
					message: "Username already taken"
				});
			}
			return fail(500, {
				message: "Ocurrio un error inesperado", form
			});
		}
		// redirect to
		// make sure you don't throw inside a try/catch block!
		throw redirect(302, "/horarios");
	}
};