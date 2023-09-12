import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { client } from "$lib/server/lucia";
import { z } from "zod";
import { superValidate } from "sveltekit-superforms/server";

const addClassSchema = z.object({
	when: z.date(),
	level: z.string().min(1),
});

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, "/");

	const form = superValidate(addClassSchema);

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
		form,
	};

};

export const actions: Actions = {
	// create a new class
	create: async (event) => {
		
		const formData = await event.request.formData();

		const form = await superValidate(formData, addClassSchema);

		const date = formData.get("when");
		const when = new Date(date).toISOString()
		const level = formData.get("level");
		

		try {
			const newClass = await client.class.create({
				data: {
					when: when,
					level: level,
				},
			});
			return { newClass, form, success: true, message: "Clase creada" }
		} catch (err) {
			console.log(err)
		}
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
	},
	addUserToClass: async ({ request, locals }) => {
		const session = await locals.auth.validate();
		if (!session) throw redirect(302, "/");
		
		const formData = await request.formData();
		const id = formData.get("id");

		try	{
			await client.class.update({
				where: {
					id: id,
				},
				data: {
					assistants: {
						connect: {
							id: session?.user?.userId,
						  },
					}
				},
			});
			return { success: true, message: "Usuario agregado a la clase" }
		} catch (err) {
			console.log(err)
		}
	},
	deleteUserToClass: async ({ request, locals }) => {
		const session = await locals.auth.validate();
		if (!session) throw redirect(302, "/");
		
		const formData = await request.formData();
		const id = formData.get("id");

		try	{
			await client.class.update({
				where: {
					id: id,
				},
				data: {
					assistants: {
						disconnect: {
							id: session?.user?.userId,
						  },
					}
				},
			});
			return { success: true, message: "Usuario eliminado de la clase" }
		} catch (err) {
			console.log(err)
		}
	}
};