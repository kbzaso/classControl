<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import FormAlert from '$lib/components/FormAlert.svelte';

	import type { PageData } from './$types';
	export let data: PageData;
	$: ({ users, session } = data);

	const { form, errors, enhance, message, delayed } = superForm(data.ADD_USER_FORM, {
		validators: {
			first_name: (first_name) => (first_name.length <= 1 ? 'Ingresa un nombre' : null),
			last_name: (first_name) => (first_name.length <= 1 ? 'Ingresa un apellido' : null),
			email: (email) => (email.length <= 6 ? 'Ingresa un correo valido' : null),
			password: (password) =>
				password.length < 6 ? 'Contraseña debe superar los 6 caracteres' : null
		}
	});

	const {
		form: DELETE_USER_FORM,
		errors: DELETE_USER_ERROR,
		enhance: DELETE_USER_ENHANCE,
		message: DELETE_USER_MESSAGE,
		delayed: DELETE_USER_DELAYED,
		formId
	} = superForm(data.DELETE_USER_FORM, {});

	console.log(formId)
</script>

<section class="">
	<img class="mx-auto mb-8" src="/logo.png" alt="Logotipo de la Bóveda Secreta" />
	<h1>Lista de alumnos</h1>
	<ul class=" space-y-4 py-4">
		{#each users as user}
			<li class="flex justify-between">
				<figure class="flex items-center gap-4">
					<img
						class="rounded-full h-10 w-10 object-cover"
						src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80"
						alt=""
					/>
					<caption>{user.first_name} {user.last_name}</caption>
				</figure>
				{#if user.id !== session.user.userId}
					<form method="POST" action="?/delete" use:DELETE_USER_ENHANCE>
						<input type="hidden" name="__superform_id" bind:value={$formId} />
						<input type="hidden" name="id" value={user.id} />
						<button class="btn btn-error btn-circle" type="submit">
							{#if $DELETE_USER_DELAYED}
								<span class="loading loading-spinner" />
							{:else}
							X
							{/if}
						</button>
					</form>
				{/if}
			</li>
		{/each}
	</ul>
</section>

<button
	class="btn bg-white/10 rounded-full w-16 h-16 absolute bottom-20 right-6"
	onclick="my_modal_5.showModal()"
>
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
		><path fill="#f9e710" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg
	>
</button>

<dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
	<form method="dialog" class="modal-box">
		<h2 class="text-xl uppercase tracking-widest text-yellow-300 text-center">Agregar Alumno</h2>
		<form
			method="post"
			use:enhance
			action="?/addUser"
			class="mt-4 flex flex-col gap-4 border border-gray-800 p-4 rounded-xl"
		>
			<label for="first_name" class="text-gray-600">
				Nombre
				<input
					bind:value={$form.first_name}
					type="text"
					id="first_name"
					name="first_name"
					class="input input-bordered input-primary w-full mt-1"
				/></label
			>
			{#if $errors.first_name}
				<FormAlert bind:errorMessage={$errors.first_name} />
			{/if}
			<label for="last_name" class="text-gray-600">
				Apellido
				<input
					bind:value={$form.last_name}
					type="text"
					id="last_name"
					name="last_name"
					class="input input-bordered input-primary w-full mt-1"
				/></label
			>
			{#if $errors.last_name}
				<FormAlert bind:errorMessage={$errors.last_name} />
			{/if}
			<label for="plan" class="text-gray-600 flex flex-col gap-1">
				Plan
				<select id="plan" class="select select-primary w-full" required name="plan">
					<option value="FOUR">4 clases menusales</option>
					<option value="EIGHT">8 clases mensuales</option>
					<option value="TWELVE">12 clases mensuales</option>
					<option value="SIXTEEN">16 clases mensuales</option>
				</select>
			</label>
			<label for="email" class="text-gray-600">
				Email
				<input
					bind:value={$form.email}
					type="email"
					id="email"
					name="email"
					class="input input-bordered input-primary w-full mt-1"
				/></label
			>
			{#if $errors.email}
				<FormAlert bind:errorMessage={$errors.email} />
			{/if}
			<label for="password" class="text-gray-600">
				Password
				<input
					bind:value={$form.password}
					type="password"
					name="password"
					id="password"
					class="input input-bordered input-primary w-full mt-1"
				/></label
			>
			{#if $errors.password}
				<FormAlert bind:errorMessage={$errors.password} />
			{/if}
			<button class="btn btn-success" type="submit">
				{#if $delayed}
					<span class="loading loading-spinner" />
				{:else}
				Agregar Nuevo Alumno
				{/if}
			</button>
			<button onclick="my_modal_5.close()" class="btn btn-outline btn-warning" type="reset"
				>Cerrar</button
			>
		</form>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
