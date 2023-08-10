<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import FormAlert from '$lib/components/FormAlert.svelte';

	import type { PageData } from './$types';
	import Badge from '$lib/components/Badge.svelte';
	export let data: PageData;
	$: ({ users, session } = data);

	const { form, errors, enhance, message, delayed } = superForm(data.ADD_USER_FORM, {
		validators: {
			first_name: (first_name) => (first_name.length <= 1 ? 'Ingresa un nombre' : null),
			last_name: (first_name) => (first_name.length <= 1 ? 'Ingresa un apellido' : null),
			email: (email) => (email.length <= 6 ? 'Ingresa un correo valido' : null),
			plan: (plan) => (plan.length <= 6 ? 'Selecciona una opción' : null),
			level: (level) => (level.length <= 6 ? 'Selecciona una opción' : null),
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
</script>

<section class="">
	<img class="mx-auto mb-8" src="/logo.png" alt="Logotipo de la Bóveda Secreta" />
	<h1 class="text-xl uppercase tracking-widest text-yellow-300 mb-4">Lista de alumnos</h1>

	<!-- {#if user.id !== session.user.userId && session.user.role === 'ADMIN'}
						<form method="POST" action="?/delete" use:DELETE_USER_ENHANCE>
							<input type="hidden" name="__superform_id" bind:value={$formId} />
							<input type="hidden" name="id" value={user.id} />
							<button class="btn btn-error btn-circle" type="submit"> X </button>
						</form>
					{/if} -->

	<div class="overflow-x-auto border rounded-xl border-blue-900">
		<table class="table">
			<!-- head -->
			<thead class="bg-blue-900 text-white">
				<tr>
					<th>Nombre</th>
					<th>Nivel</th>
				</tr>
			</thead>
			<tbody>
				<!-- row 1 -->
				{#each users as user}
					<tr>
						<td class="text-md flex flex-col gap-1">
							<span>
								{user.first_name}
								{user.last_name}
							</span>
								<Badge text={user.level} />
						</td>

						<td>
							<a href={`/alumnos/${user.id}`} class="btn btn-sm btn-outline btn-warning">Ver</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>

{#if session.user.role === 'ADMIN'}
	<button
		class="btn bg-white/10 rounded-full w-16 h-16 absolute bottom-20 right-6"
		onclick="my_modal_5.showModal()"
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
			><path fill="#f9e710" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg
		>
	</button>
{/if}

{#if $DELETE_USER_DELAYED}
	<div class="btn bg-white/10 rounded-full w-16 h-16 absolute bottom-20 left-6">
		<span class="loading loading-spinner" />
	</div>
{/if}

<dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
	<form method="dialog" class="modal-box">
		<h2 class="text-xl uppercase tracking-widest text-yellow-300 text-center">Agregar Alumno</h2>
		<form
			method="post"
			use:enhance
			action="?/addUser"
			class="mt-4 flex flex-col gap-4 border border-gray-800 p-4 rounded-xl"
		>
			<SuperDebug data={$form} />
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
			<label for="level" class="text-gray-600 flex flex-col gap-1">
				Nivel
				<select
					id="level"
					class="select select-primary w-full"
					name="level"
					bind:value={$form.level}
				>
					<option value="BASIC">Básico</option>
					<option value="INTERMEDIATE">Intermedio</option>
					<option value="ADVANCE">Avanzado</option>
				</select>
			</label>
			{#if $errors.level}
				<FormAlert bind:errorMessage={$errors.level} />
			{/if}
			<label for="plan" class="text-gray-600 flex flex-col gap-1">
				Plan
				<select id="plan" class="select select-primary w-full" name="plan" bind:value={$form.plan}>
					<option value="FOUR">4 clases menusales</option>
					<option value="EIGHT">8 clases mensuales</option>
					<option value="TWELVE">12 clases mensuales</option>
					<option value="SIXTEEN">16 clases mensuales</option>
				</select>
			</label>
			{#if $errors.plan}
				<FormAlert bind:errorMessage={$errors.plan} />
			{/if}
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
