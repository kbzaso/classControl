import { fail, redirect } from "@sveltejs/kit";

import type { Actions, PageServerLoad } from "./$types";
import { auth } from "$lib/server/lucia";

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, "/");
	return {
		userId: session.user.userId,
		email: session.user.email,
		first_name: session.user.first_name
	};
};