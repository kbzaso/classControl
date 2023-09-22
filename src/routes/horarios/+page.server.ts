import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { client } from '$lib/server/lucia';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import type { Level } from '@prisma/client';

const addClassSchema = z.object({
	when: z.date(),
	level: z.string().min(1)
});

const deleteClassSchema = z.object({
	id: z.string().min(1)
});
const assistToClassSchema = z.object({
	id: z.string().min(2)
});
const noAssistToClassSchema = z.object({
	id: z.string().min(3)
});

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/');

	const form = superValidate(addClassSchema);

	const formDelete = await superValidate(deleteClassSchema);

	const formAssistToClass = await superValidate(assistToClassSchema);
	
	const formNoAssistToClass = await superValidate(noAssistToClassSchema);

	const classes = await client.class.findMany({
		orderBy: {
			when: 'asc'
		},
		select: {
			id: true,
			createdAt: true,
			when: true,
			level: true,
			max_students: true,
			assistants: true
		},
		where: {
			when: {
				gt: new Date().toISOString()
			}
		}
	});
	return {
		classes,
		user: session.user,
		form,
		formDelete,
		formAssistToClass,
		formNoAssistToClass
	};
};

export const actions: Actions = {
	// create a new class
	create: async (event) => {
		const formData = await event.request.formData();

		const form = await superValidate(formData, addClassSchema);

		const date = formData.get('when');
		const when = new Date(date).toISOString();
		const level = formData.get('level');

		try {
			const newClass = await client.class.create({
				data: {
					when: when,
					level: level
				}
			});
			return { newClass, form, success: true, message: 'Clase creada' };
		} catch (err) {
			console.log(err);
		}
	},

	delete: async ({ request, locals }) => {
		const formData = await request.formData();

		const formDelete = await superValidate(formData, deleteClassSchema);

		const id = formData.get('id');

		await client.class.delete({
			where: {
				id: id
			}
		});
		return { success: true, message: 'Clase eliminada', formDelete };
	},
	update: async ({ request, locals }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		const date = formData.get('when');
		const when = date !== null ? new Date(date).toISOString() : undefined;
		const level = formData.get('level') as Level;

		try {
			if (when !== undefined && level !== null) {
				await client.class.update({
					where: {
						id: id?.toString()
					},
					data: {
						when: when,
						level: level
					}
				});
				return { success: true, message: 'Clase actualizada' };
			} else {
				return { success: false, message: 'Level cannot be null' };
			}
		} catch (err) {
			console.log(err);
		}
	},
	addUserToClass: async ({ request, locals }) => {
		const session = await locals.auth.validate();
		if (!session) throw redirect(302, '/');

		const formData = await request.formData();
		const id = formData.get('id');
		
		const formAssistToClass = await superValidate(formData, assistToClassSchema);

		try {
			await client.class.update({
				where: {
					id: id
				},
				data: {
					assistants: {
						connect: {
							id: session?.user?.userId
						}
					}
				}
			});
			return { success: true, message: 'Usuario agregado a la clase', formAssistToClass };
		} catch (err) {
			console.log(err);
		}
	},
	deleteUserToClass: async ({ request, locals }) => {
		const session = await locals.auth.validate();
		if (!session) throw redirect(302, '/');

		const formData = await request.formData();
		const id = formData.get('id');

		const formNoAssistToClass = await superValidate(formData, noAssistToClassSchema);

		try {
			await client.class.update({
				where: {
					id: id
				},
				data: {
					assistants: {
						disconnect: {
							id: session?.user?.userId
						}
					}
				}
			});
			return { success: true, message: 'Usuario eliminado de la clase', formNoAssistToClass };
		} catch (err) {
			console.log(err);
		}
	}
};
