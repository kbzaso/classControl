import { redirect, type Actions } from "@sveltejs/kit";
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

export const actions: Actions = {
	// create a new class
	create: async ({ request, locals }) => {
		const session = await locals.auth.validate();
		if (!session) throw redirect(302, "/");

		const formData = await request.formData();
		let when = formData.get("when");
		when = new Date(when).toISOString()
		const level = formData.get("level");

		console.log(formData)

		const newClass = await client.class.create({
			data: {
				when: when,
				level: level,
			},
		});
		throw redirect(302, "/horarios");
	},
};