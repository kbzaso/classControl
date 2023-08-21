<script lang="ts">
	import 'iconify-icon';
	import { fly } from 'svelte/transition';
	import Badge from './Badge.svelte';
	import { PUBLIC_PROJECT_URL } from '$env/static/public';

	$: checked = false;
	const toggle = () => {
		checked = !checked;
	};

	const format = (date, locale, options) => {
		return new Intl.DateTimeFormat(locale, options).format(date);
	};

	export let data: any;
	export let userId: any;

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
		{/key}
	</ul>
{/if}
