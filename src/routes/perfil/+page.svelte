<script lang="ts">
	import { onMount } from 'svelte';

	import type { PageData } from './$types';
	export let data: PageData;
	
	import Badge from '$lib/components/Badge.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';


	const { form, errors, enhance, message, delayed } = superForm(data.form, {
		validators: {
			first_name: (first_name) => (first_name.length <= 1 ? 'Ingresa un nombre' : null),
			last_name: (first_name) => (first_name.length <= 1 ? 'Ingresa un apellido' : null)
		}
	});

	
	onMount(() => {
		if (data?.user?.role !== 'ADMIN') {
			const plan = document.getElementById('plan') as HTMLSelectElement;
			plan.value = data?.user?.plan || 'FOUR';
		}
	});
	console.log(data)


</script>

<main class="w-full mb-10">
	<div>
		<div class="w-full flex flex-col items-center gap-4">
			<img
				class="rounded-full h-40 w-40 object-cover"
				src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80"
				alt=""
			/>
			<div class="flex flex-col items-center gap-1">
				<h1 class="text-2xl uppercase tracking-widest text-yellow-300 text-left">
					{data?.user?.first_name}
					{data?.user?.last_name}
				</h1>
				<span>{data?.user?.email}</span>
			</div>
			<Badge level={data?.user?.level} size={'badge-md'} />
			<button class="btn btn-link" onclick="my_modal_1.showModal()">Editar</button>
		</div>

		<dialog id="my_modal_1" class="modal modal-bottom sm:modal-middle">
			<form method="dialog" class="modal-box">
				<SuperDebug data={$form} />
				<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
				<span class="text-xl uppercase tracking-widest text-yellow-300 text-center">Editar</span>

				<form
					use:enhance
					method="POST"
					action="?/update"
					class="mt-4 flex flex-col gap-4 border border-gray-800 p-4 rounded-xl"
				>
					<label for="last_name" class="text-gray-600">
						Nombre
						<input
						bind:value={$form.first_name}
						placeholder={data?.user?.first_name}
							type="text"
							id="first_name"
							name="first_name"
							class="input input-bordered input-primary w-full mt-1"

						/></label
					>
					{#if $errors.first_name}
						<p class="text-red-500">{$errors.first_name}</p>
					{/if}
					<label for="last_name" class="text-gray-600">
						Apellido
						<input
						bind:value={$form.last_name}
						placeholder={data?.user?.last_name}
							type="text"
							id="last_name"
							name="last_name"
							class="input input-bordered input-primary w-full mt-1"
						/></label
					>
					{#if $errors.last_name}
						<p class="text-red-500">{$errors.last_name}</p>
					{/if}
					<!-- <label for="foto" class="text-gray-600">
				Fotografía
				<input
					type="file"
					id="foto"
					name="foto"
					class="mt-1 file-input file-input-bordered file-input-primary w-full"
				/>
			</label> -->
					<!-- {#if data?.user?.role !== 'ADMIN'}
				<label for="plan" class="text-gray-600 flex flex-col gap-1">
					Plan
					<select id="plan" class="select select-primary w-full" required name="plan">
						<option value="FOUR">4 clases menusales</option>
						<option value="EIGHT">8 clases mensuales</option>
						<option value="TWELVE">12 clases mensuales</option>
						<option value="SIXTEEN">16 clases mensuales</option>
					</select>
				</label>
			{/if} -->
					<button class="btn bg-yellow-300 text-black" type="submit">Guardar</button>
				</form>
			</form>
		</dialog>

		{#if data?.user?.role !== 'ADMIN'}
			<div class="space-y-4 mt-8">
				<p>Tu plan comenzó el 30/05/2023 y vence el 30/06/2023</p>
				<p>Te quedan 3 clases disponibles antes de tu renovación.</p>
			</div>
		{/if}
	</div>
</main>
