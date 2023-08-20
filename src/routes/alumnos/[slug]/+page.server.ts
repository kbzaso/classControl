import type { Actions, PageServerLoad } from './$types';
import { fail } from 'assert';
import { client } from '$lib/server/lucia';
import { z } from 'zod';
import { message, superValidate } from 'sveltekit-superforms/server';
import { redirect } from '@sveltejs/kit';

const deleteUserSchema = z.object({
	id: z.string().min(1)
});
const updateUserSchema = z.object({
	level: z.string()
});

export const load: PageServerLoad = async ({ params }) => {
	const user = await client.user.findUnique({
		where: {
			id: params.slug
		}
	});
    const DELETE_USER_FORM = await superValidate(deleteUserSchema, {
        id: '1'
    });
	const UPDATE_USER_FORM = await superValidate(user, updateUserSchema, {
        id: '2'
    });

	return { user, DELETE_USER_FORM, UPDATE_USER_FORM };
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const formData = await request.formData();

        const deleteForm = await superValidate(formData, deleteUserSchema);

		const id = formData.get('id');

        if (!deleteForm.valid) return fail(400, { deleteForm });

		await client.user.delete({
			where: {
				id: String(id)
			}
		});
		throw redirect(302, '/alumnos');
	},
    update: async ( event ) => {
        const session = await event.locals.auth.validate();
        const formData = await event.request.formData();

        const updateForm = await superValidate(formData, updateUserSchema);
        const id = formData.get('id');
        const level = formData.get('level');

        if (!updateForm.valid) return fail(400, { updateForm });

        try {
            const user = await client.user.update({
                where: {
                    id: id
                },
                data: {
                    level
                }
            });
            return {
                user, updateForm
            }
        } catch (error) {
            console.log(error);
        }

        
    }
};
