import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fail } from 'assert';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) {
		console.log('No session');
	} else {
		return {
			userId: session.user.userId,
			first_name: session.user.first_name,
			last_name: session.user.last_name,
			email: session.user.email,
		};
	}
};
