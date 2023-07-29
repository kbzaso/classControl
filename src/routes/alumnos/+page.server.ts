// import { PrismaClient } from '@prisma/client'
// import { fail, redirect } from '@sveltejs/kit'
// import type {  PageServerLoad } from './$types'
// import type { profiles } from "@prisma/client"

// export const load: PageServerLoad = async ({fetch, depends, locals: { supabase, getSession } }) => {
//   const session = await getSession()

//   if (!session) {
//     throw redirect(303, '/')
//   }

//   const res = await fetch('/api/profiles')
//     const profiles: profiles[] = await res.json()
//     depends('profiles')

//   return { session, profiles }
// }