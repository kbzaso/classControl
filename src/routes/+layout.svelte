<script>
	import '../app.css';
	import Drawer from '$lib/components/Drawer.svelte';

	import { hiddenDrawer } from '$lib/stores.js';

	export let data;

</script>

<div class="p-4 container pb-20 min-h-screen  grid">
	<slot />
	<Drawer  />
</div>
	{#if data.first_name}
	<button
		on:click={() => ($hiddenDrawer = false)}
		class="fixed bottom-0 btn btn-primary h-14 w-full rounded-b-none">MENU</button
	>
	{/if}
