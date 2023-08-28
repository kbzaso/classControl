<script lang="ts">
	import 'iconify-icon';
	import { fly } from 'svelte/transition';
	import Badge from './Badge.svelte';
	import { PUBLIC_PROJECT_URL } from '$env/static/public';
	import { enhance } from '$app/forms';

	$: checked = false;
	const toggle = () => {
		checked = !checked;
	};

	const format = (date, locale, options) => {
		return new Intl.DateTimeFormat(locale, options).format(date);
	};

	export let data: any;
	export let userId: any;
	export let classId: any;

	let userExists = false;
	data.assistants.forEach((assistant) => {
		if (assistant.id === userId) {
			userExists = true;
		}
	});
	
</script>

<button
	class={`active:scale-105 w-full h-fit  p-4 mt-2 space-y-1 flex justify-between min-w-[345px] transition-all ${
		checked ? 'bg-blue-950 rounded-t-xl' : 'bg-white/10 rounded-md'
	}`}
	on:click={toggle}
>
	<div class="space-y-1 flex flex-col">
		<h2 class="font-semibold capitalize">
			{format(data.when, 'es-CL', { weekday: 'long', month: 'long', day: 'numeric' })}
		</h2>
		<Badge level={data?.level} size={'badge-md'} />
	</div>
	<div class="flex gap-1">
		<iconify-icon class="mt-1" icon="ri:time-line" />
		<span>{format(data.when, 'es-CL', { timeStyle: 'short' })}</span>
		<iconify-icon
			class="mt-1 h-fit text-yellow-300 transition-all"
			class:rotate-180={checked}
			icon="ion:chevron-down"
		/>
	</div>
</button>
{#if checked}
	<ul class=" space-y-4 border-x border-b border-blue-900 rounded-b-xl p-4" in:fly={{ y: 10 }}>
		{#key checked}
			{#each data?.assistants as assistant}
				<li class="flex gap-2 items-center justify-between">
					<figure class="flex items-center gap-2">
						<div class="avatar">
							<div class="w-10 mask mask-squircle">
								<img
									alt="Avatar"
									src={assistant.avatarUrl
										? `${PUBLIC_PROJECT_URL}/storage/v1/object/public/profiles/${assistant.avatarUrl}`
										: 'https://assets.adnradio.cl/2022/03/Stone-Cold-Steve-Austin-WrestleMania-38-WWE.png'}
								/>
							</div>
						</div>
						<p>{assistant.first_name} {assistant.last_name}</p>
					</figure>
					{#if !userExists}
						<a href={`/alumnos/${assistant.id}`} class="btn btn-outline btn-warning">Ver</a>
					{/if}
				</li>
			{/each}
			{#if !userExists}
				<button class="btn btn-success w-full"> Asistir </button>
			{:else}
				<button class="btn btn-error w-full"> No Asistir </button>
			{/if}
			<div class="border border-gray-800 p-4 rounded-xl bg-zinc-900 flex gap-4">
				<form class="w-full">
					<button class="btn btn-warning w-full" onclick="my_modal_8.showModal()">Editar</button>
				</form>
				<form action="/horarios?/delete" method="POST" class="w-full" use:enhance>
					<input type="hidden" name="id" value={classId} />
					<button class="btn btn-error w-full">Eliminar</button>
				</form>
			</div>
		{/key}
	</ul>
{/if}


<!-- UPDATE CLASS -->
<dialog id="my_modal_8" class="modal modal-bottom sm:modal-middle">
	<form method="dialog" class="modal-box">
		<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		<form method="POST" action="/horarios?/update" class="mt-4 flex flex-col gap-4 border border-gray-800 p-4 rounded-xl" use:enhance>
			<h2 class="text-xl uppercase tracking-widest text-yellow-300 text-center">Editar clase</h2>
			<input type="hidden" name="id" value={classId} />
			<label for="when" class="text-gray-600"
				>Fecha

				<input
					type="datetime-local"
					id="when"
					name="when"
					class="input input-bordered input-primary w-full mt-1 text-left"
					min="2023-01-01"
				/>
			</label>

			<label for="level" class="text-gray-600 flex flex-col gap-1">
				Nivel
				<select id="level" class="select select-primary w-full" required name="level">
					<option value="BASIC">Básico</option>
					<option value="INTERMEDIATE">Intermedio</option>
					<option value="ADVANCED">Avanzado</option>
				</select>
			</label>
			<button class="btn btn-success" type="submit">Crear</button>
			<button onclick="my_modal_8.close()" class="btn btn-outline btn-warning" type="reset"
				>Cerrar</button
			>
		</form>
	</form>
</dialog>