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
		const date = formData.get("when");
		const when = new Date(date).toISOString()
		const level = formData.get("level");

		const newClass = await client.class.create({
			data: {
				when: when,
				level: level,
			},
		});
		return { newClass }
	},

	delete: async ({ request, locals }) => {
		const formData = await request.formData();
		const id = formData.get("id");

		await client.class.delete({
			where: {
				id: id,
			},
		});
		return { success: true, message: "Clase eliminada" }
	},
	update: async ({ request, locals }) => {
		const formData = await request.formData();
		const id = formData.get("id");
		const date = formData.get("when");
		const when = new Date(date).toISOString()
		const level = formData.get("level");

		try	{
			await client.class.update({
				where: {
					id: id,
				},
				data: {
					when: when,
					level: level,
				},
			});
			return { success: true, message: "Clase actualizada" }
		} catch (err) {
			console.log(err)
		}

	}
};