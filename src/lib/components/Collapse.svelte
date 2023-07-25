<script lang="ts">
	import 'iconify-icon';
	import { fly } from 'svelte/transition';

	$: checked = false;
	const toggle = () => {
		checked = !checked;
	};

</script>

<button
	class={`active:scale-105 w-full h-fit rounded-md p-4 mt-2 space-y-1 flex justify-between min-w-[345px] transition-all ${checked ? "bg-blue-950" : "bg-white/10"}`}
	on:click={toggle}
>
	<div class="space-y-1 flex flex-col">
		<h2 class="font-semibold">Mártes 16/06/2023</h2>
		<div class="badge badge-secondary">Nivel Básico</div>
	</div>
	<div class="flex gap-1">
		<iconify-icon class="mt-1" icon="ri:time-line" />
		<span>12:00 PM</span>
		<iconify-icon class="mt-1 h-fit text-yellow-300 transition-all" class:rotate-180={checked} icon="ion:chevron-down" />
	</div>
</button>
{#if checked}
<ul class="mt-4 ml-4 space-y-2" in:fly={{ y: 10 }}>
	{#key checked}
			<li class="flex gap-2 items-center">
                <img class="rounded-full h-10 w-10 object-cover" src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80" alt="">
                <p>Alejandro Sáez</p>
            </li>
			<li class="flex gap-2 items-center">
                <img class="rounded-full h-10 w-10 object-cover" src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80" alt="">
                <p>Alejandro Sáez</p>
            </li>
			<li class="flex gap-2 items-center">
                <img class="rounded-full h-10 w-10 object-cover" src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80" alt="">
                <p>Alejandro Sáez</p>
            </li>
            {/key}
    </ul>
{/if}
