<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	import { LEVEL, PLAN } from '$lib/constants/const.js';
	import Badge from '$lib/components/Badge.svelte';
	import { PUBLIC_PROJECT_URL } from '$env/static/public';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data: PageData;

	$: ({ user } = data);

	const { enhance: enhanceDelete, delayed: delayedDelete } = superForm(data.DELETE_USER_FORM, {
		id: '1'
	});
	const { form: formUpdate, enhance: enhanceUpdate, delayed: delayedUpdate } = superForm(data.UPDATE_USER_FORM, {
		id: '2'
	});
</script>

<main class="mt-4 mb-20">
	<section class="flex flex-col">
		<div class="w-full flex flex-col items-center gap-4">
			  <div class="avatar">
				<div class="w-56 mask mask-squircle">
				  <img alt="Avatar" src={ data?.user?.avatarUrl ? `${PUBLIC_PROJECT_URL}/storage/v1/object/public/profiles/${data?.user?.avatarUrl}` : 'https://assets.adnradio.cl/2022/03/Stone-Cold-Steve-Austin-WrestleMania-38-WWE.png'} />
				</div>
			  </div>
			<div class="flex flex-col items-center gap-1">
				<h1 class="text-2xl text-center uppercase tracking-widest text-yellow-300">
					{data?.user?.first_name}
					{data?.user?.last_name}
				</h1>
				<span>{data?.user?.email}</span>
			</div>
		
	</div>
	<aside class="border border-gray-800 p-4 rounded-xl my-4">
		<ul class="space-y-2 text-lg">
			<li class="">
				<span class="uppercase tracking-widest text-yellow-300 text-left text-sm">Nivel: </span>
				<Badge level={data?.user?.level} size={'badge-md'} />
			</li>
			<li class="flex items-center gap-2">
				<span class="uppercase tracking-widest text-yellow-300 text-left text-sm">Plan: </span>
				<p>{PLAN[user?.plan]}</p>
			</li>
			<li class="flex items-center gap-2">
				<span class="uppercase tracking-widest text-yellow-300 text-left text-sm"
					>Clases disponibles:
				</span>
				<p>6</p>
			</li>
			<li class="flex items-center gap-2">
				<span class="uppercase tracking-widest text-yellow-300 text-left text-sm">Su plan termina: </span>
				<p>06/06/2023</p>
			</li>
		</ul>
		<button class="btn w-full mt-4 btn-success" onclick="my_modal_3.showModal()">
			Editar</button
		>
		<!-- DELETE FORM -->
		<form method="POST" action="?/delete" use:enhanceDelete class="mt-4">
			<input type="hidden" name="id" value={data.user?.id} />
			<button class="btn btn-error w-full" type="submit">
				{#if $delayedDelete}
					<span class="loading loading-spinner" />
				{:else}
					Eliminar alumno
				{/if}
			</button>
		</form>
	</aside>
	</section>

	<!-- UPDATE FORM -->
	<dialog id="my_modal_3" class="modal modal-bottom sm:modal-middle">
		<form method="dialog" class="modal-box">
			<!-- <SuperDebug data={$form} /> -->
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
			<span class="text-xl uppercase tracking-widest text-yellow-300 text-center">Editar</span>

			<form
				use:enhanceUpdate
				method="POST"
				use:enhanceUpdate
				action="?/update"
				class="mt-4 flex flex-col gap-4 border border-gray-800 p-4 rounded-xl"
			>
				<input type="hidden" name="id" value={user?.id} />
					<label for="level" class="text-gray-600 flex flex-col gap-1">
						Nivel
						<select
							id="level"
							class="select select-primary w-full"
							name="level"
							bind:value={$formUpdate.level}
						>
							<option value="BASIC">Básico</option>
							<option value="INTERMEDIATE">Intermedio</option>
							<option value="ADVANCED">Avanzado</option>
						</select>
					</label>
				<button class="btn btn-success" type="submit">
					{#if $delayedUpdate}
						<span class="loading loading-spinner" />
					{:else}
						Guardar
					{/if}
				</button>
				<button onclick="my_modal_3.close()" class="btn btn-outline btn-warning" type="reset"
					>Cerrar</button
				>
			</form>
		</form>
	</dialog>

	
	

	<a href="/alumnos" class="btn btn-outline w-full btn-warning">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
			><path
				fill="currentColor"
				d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42a.996.996 0 0 0-1.41 0l-6.59 6.59a.996.996 0 0 0 0 1.41l6.59 6.59a.996.996 0 1 0 1.41-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"
			/></svg
		>
		Regresar</a
	>
		
</main>
