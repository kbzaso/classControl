import type { Actions, PageServerLoad } from './$types';
import { fail } from 'assert';
import { client } from '$lib/server/lucia';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { redirect } from '@sveltejs/kit';


const deleteUserSchema = z.object({
	id: z.string().min(1)
});

export const load: PageServerLoad = async ({params}) => {
    const DELETE_USER_FORM = superValidate(deleteUserSchema);
    const user = await client.user.findUnique({
        where: {
            id: params.slug
        }
    });
    return { user, DELETE_USER_FORM }
};


export const actions: Actions = {
    default: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		await client.user.delete({
			where: {
				id: String(id)
			}
		});
        throw redirect(302, "/alumnos");
	},
}