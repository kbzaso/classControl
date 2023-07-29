import { fail, redirect } from '@sveltejs/kit'
import type {  PageServerLoad } from './$types'
import type { profiles } from "@prisma/client"


export const load: PageServerLoad = async ({fetch, depends, locals: { supabase, getSession } }) => {
  const session = await getSession()

  if (!session) {
    throw redirect(303, '/')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select(`username, full_name, website, avatar_url, plan`)
    .eq('id', session.user.id)
    .single()

  return { session, profile }
}
