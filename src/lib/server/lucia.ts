import { lucia } from "lucia";
import { sveltekit } from "lucia/middleware";
import { dev } from "$app/environment";
import { prisma } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

export const client = new PrismaClient();

// expect error
export const auth = lucia({
	adapter: prisma(client),
	env: dev ? "DEV" : "PROD",
	middleware: sveltekit(),

    getUserAttributes: (data) => {
		return {
			email: data.email,
			first_name: data.first_name,
		};
	}
});

export type Auth = typeof auth;