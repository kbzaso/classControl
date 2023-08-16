<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	import { LEVEL, PLAN } from '$lib/constants/const.js';
	import Badge from '$lib/components/Badge.svelte';
	import { PUBLIC_PROJECT_URL } from '$env/static/public';

	export let data: PageData;

	$: ({ user } = data);
	const { enhance, delayed } = superForm(data.DELETE_USER_FORM, {});
</script>

<main class="mt-4">
	<section class="flex flex-col">
		<div class="w-full flex flex-col items-center gap-4">
		
			<div class="avatar">
				<div class="w-48 rounded-full">
					<img
					class="object-cover"
					src={`${PUBLIC_PROJECT_URL}/storage/v1/object/public/profiles/${data?.user?.avatarUrl}`}
					alt="Avatar"
				/>
				</div>
			  </div>
			<div class="flex flex-col items-center gap-1">
				<h1 class="text-2xl text-center uppercase tracking-widest text-yellow-300">
					{data?.user?.first_name}
					{data?.user?.last_name}
				</h1>
				<span>{data?.user?.email}</span>
			</div>
		<Badge level={data?.user?.level} size={'badge-md'} />
	</div>
	<aside class="border border-gray-800 p-4 rounded-xl my-4">
		<ul class="space-y-2 text-lg">
			<li class="flex flex-col">
				<span class="uppercase tracking-widest text-yellow-300 text-left text-sm">Plan: </span>
				<p>{PLAN[user?.plan]}</p>
			</li>
			<li class="flex flex-col">
				<span class="uppercase tracking-widest text-yellow-300 text-left text-sm"
					>Clases disponibles:
				</span>
				<p>6</p>
			</li>
			<li class="flex flex-col">
				<span class="uppercase tracking-widest text-yellow-300 text-left text-sm">Su plan termina: </span>
				<p>06/06/2023</p>
			</li>
		</ul>
	</aside>
	</section>

		<form method="POST" use:enhance class="flex gap-4 justify-between w-full mt-4">
			<a href="/alumnos" class="btn btn-outline">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42a.996.996 0 0 0-1.41 0l-6.59 6.59a.996.996 0 0 0 0 1.41l6.59 6.59a.996.996 0 1 0 1.41-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"
					/></svg
				>
				Regresar</a
			>
			<input type="hidden" name="id" value={user?.id} />
			<button class="btn btn-error" type="submit">
				{#if $delayed}
					<span class="loading loading-spinner" />
				{:else}
					Eliminar alumno
				{/if}
			</button>
		</form>
</main>
