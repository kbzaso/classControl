import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { client } from "$lib/server/lucia";

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, "/");

	const classes = await client.class.findMany({
		select: {
			id: true,
			createdAt: true,
			when: true,
			level: true,
			max_students: true,
			assistants: true,
		},
	});
	return {
		classes,
		user: session.user,
	};
};