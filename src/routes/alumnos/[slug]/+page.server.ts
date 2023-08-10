import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fail } from 'assert';
import { client } from '$lib/server/lucia';

export const load: PageServerLoad = async ({params}) => {
    const user = await client.user.findUnique({
        where: {
            id: params.slug
        }
    });
    return { user }
};