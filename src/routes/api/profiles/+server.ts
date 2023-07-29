import { PrismaClient } from '@prisma/client'
import type { RequestHandler } from './$types'

const client = new PrismaClient()

export const GET: RequestHandler = async (event) => {
    const profiles = await client.profiles.findMany({
    })
    const options: ResponseInit = {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        }
    }
    return new Response(JSON.stringify(profiles), options)
} 

// create a function to update a profile in the database
export const PUT: RequestHandler = async (event) => {
    const data = await event.request.formData()
    // const { id, fullName, avatarUrl, plan } = data
    const id = data.get('id') as string
    const fullName = data.get('fullName') as string
    const avatarUrl = data.get('avatarUrl') as string

    const profile = await client.profiles.update({
        where: { id },
        data: { fullName, avatarUrl, plan },
    })
    const options: ResponseInit = {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        }
    }
    return new Response(JSON.stringify(profile), options)
}