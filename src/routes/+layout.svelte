<script>
	import '../app.css';
	import Drawer from '$lib/components/Drawer.svelte';

	import { hiddenDrawer } from '$lib/stores.js';
</script>

<div class="container mx-auto p-4 relative pb-20">
	<slot />
	<Drawer />
</div>

<button
			on:click={() => ($hiddenDrawer = false)}
			class="fixed bottom-0 btn btn-primary h-14 w-full rounded-b-none">MENU</button
		>