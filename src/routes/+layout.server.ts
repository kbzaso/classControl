import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fail } from 'assert';
import { client } from '$lib/server/lucia';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	const user = await client.user.findUnique({
		where: {
			id: session.user.userId
		}
	});
	
	if (!session) {
		if (session) throw redirect(302, "/");
	} else {
		return {
			user,
			userId: session.user.userId,
		};
	}
};
