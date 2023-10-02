<script lang="ts">
	import { onMount } from 'svelte';

	import type { PageData } from './$types';
	export let data: PageData;

	import Badge from '$lib/components/Badge.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { PUBLIC_PROJECT_URL } from '$env/static/public';
	import { PLAN } from '$lib/constants/const';
	import { dateFormat } from '$lib/utils';

	const { form, errors, enhance, delayed } = superForm(data.form);

	const {
		form: formAvatar,
		enhance: enhanceAvatar,
		delayed: delatedAvatar
	} = superForm(data.formAvatar, {
		resetForm: true
	});

</script>

<main class="w-full mb-10">
	<div>
		<div class="w-full flex flex-col items-center gap-4">
			<button onclick="my_modal_6.showModal()">
				<div class="avatar">
					<div class="w-56 mask mask-squircle">
						<img
							alt="Avatar"
							src={data?.user?.avatarUrl
								? `${PUBLIC_PROJECT_URL}/storage/v1/object/public/profiles/${data?.user?.avatarUrl}`
								: 'https://assets.adnradio.cl/2022/03/Stone-Cold-Steve-Austin-WrestleMania-38-WWE.png'}
						/>
					</div>
				</div>
			</button>
			<div class="flex flex-col items-center gap-1">
				<h1 class="text-2xl text-center uppercase tracking-widest text-yellow-300">
					{data?.user?.first_name}
					{data?.user?.last_name}
				</h1>
				<span>{data?.user?.email}</span>
			</div>
		</div>

		<dialog id="my_modal_1" class="modal modal-bottom sm:modal-middle">
			<form method="dialog" class="modal-box">
				<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
				<span class="text-xl uppercase tracking-widest text-yellow-300 text-center">Editar</span>

				<form
					method="POST"
					action="?/update"
					use:enhance
					class="mt-4 flex flex-col gap-4 border border-gray-800 p-4 rounded-xl"
				>
					<label for="last_name" class="text-gray-600">
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
						<p class="text-red-500">{$errors.first_name}</p>
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
						<p class="text-red-500">{$errors.last_name}</p>
					{/if}
					{#if data?.user?.role !== 'ADMIN'}
						<label for="plan" class="text-gray-600 flex flex-col gap-1">
							Plan
							<select
								id="plan"
								class="select select-primary w-full"
								name="plan"
								bind:value={$form.plan}
							>
								<option value="FOUR">4 clases menusales</option>
								<option value="EIGHT">8 clases mensuales</option>
								<option value="TWELVE">12 clases mensuales</option>
								<option value="SIXTEEN">16 clases mensuales</option>
							</select>
						</label>
					{/if}
					<button class="btn btn-success" type="submit">
						{#if $delayed}
							<span class="loading loading-spinner" />
						{:else}
							Guardar
						{/if}
					</button>
					<button onclick="my_modal_1.close()" class="btn btn-outline btn-warning" type="reset"
						>Cerrar</button
					>
				</form>
			</form>
		</dialog>
		<!-- change avatar -->
		<dialog id="my_modal_6" class="modal modal-bottom sm:modal-middle">
			<form method="dialog" class="modal-box">
				<SuperDebug data={$formAvatar} />
				<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
				<span class="text-xl uppercase tracking-widest text-yellow-300 text-center">Editar</span>

				<form
					method="POST"
					action="?/updateAvatar"
					use:enhanceAvatar
					enctype="multipart/form-data"
					class="mt-4 flex flex-col gap-4 border border-gray-800 p-4 rounded-xl"
				>
					<label for="file" class="text-gray-600 flex flex-col">
						Avatar
						<input
							bind:value={$formAvatar.avatar}
							id="file"
							name="file"
							type="file"
							class="file-input file-input-bordered file-input-primary w-full max-w-xs mt-1"
						/>
					</label>
					<button class="btn btn-success" type="submit">
						{#if $delatedAvatar}
							<span class="loading loading-spinner" />
						{:else}
							Guardar
						{/if}
					</button>
					<button onclick="my_modal_6.close()" class="btn btn-outline btn-warning" type="reset"
						>Cerrar</button
					>
				</form>
			</form>
		</dialog>

		<div class="space-y-4">
			<aside class="border border-gray-800 p-4 rounded-xl my-4">
				<ul class="space-y-2 text-lg">
					<li class="">
						<span class="uppercase tracking-widest text-yellow-300 text-left text-sm">Nivel: </span>
						<Badge level={data?.user?.level} size={'badge-md'} />
					</li>
					{#if data?.user?.role !== 'ADMIN'}
						<li class="flex items-center gap-2">
							<span class="uppercase tracking-widest text-yellow-300 text-left text-sm"
								>Plan:
							</span>
							{#if PLAN[data?.user?.plan] === 'FOUR'}
								<p>4 clases - $20.000</p>
							{:else if PLAN[data?.user?.plan] === 'EIGHT'}
								<p>8 clases - $30.000</p>
							{:else if PLAN[data?.user?.plan] === 'TWELVE'}
								<p>12 clases - $42.000</p>
							{:else if PLAN[data?.user?.plan] === 'SIXTEEN'}
								<p>16 clases - $52.000</p>
							{/if}
						</li>
						<li class="flex items-center gap-2">
							<span class="uppercase tracking-widest text-yellow-300 text-left text-sm"
								>Clases disponibles:
							</span>
							<p>{data?.user?.classesRemaining}</p>
						</li>
						<li class="flex items-center gap-2">
							<span class="uppercase tracking-widest text-yellow-300 text-left text-sm"
								>Su plan termina:
							</span>
							<p class="text-md">{dateFormat(data.lastPayment?.expiresAt, 'es-CL', { month: 'numeric', day: 'numeric', year: "numeric", })}</p>
						</li>
					{/if}
				</ul>
				<button class="btn w-full mt-4 btn-warning" onclick="my_modal_1.showModal()">
					Editar</button
				>
			</aside>
		</div>
	</div>
</main>
