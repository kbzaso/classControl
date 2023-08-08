import { fail, redirect } from "@sveltejs/kit";

import type { Actions, PageServerLoad } from "./$types";
import { client } from "$lib/server/lucia";
import { Console } from "console";

export const load: PageServerLoad = async ({ locals }) => {
	const users = await client.user.findMany({
		select: {
			id: true,
			email: true,
			first_name: true,
			last_name: true,
			role: true,
		},
	});
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, "/");
	return {
		users,
		session
	};
};

export const actions: Actions = {
	// todo: add user to database action
	
	default: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get("id");
		await client.user.delete({
			where: {
				id: String(id),
			},
		});
		return new Response(null, { status: 200 });
	}
}