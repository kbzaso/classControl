<script>
	import '../app.css';
	import Drawer from '$lib/components/Drawer.svelte';

	import { hiddenDrawer } from '$lib/stores.js';
</script>

<div class="container mx-auto p-4 h-screen relative">
	<slot />
	<div class="absolute bottom-10 w-full pr-4">
		<button
			on:click={() => ($hiddenDrawer = false)}
			class="btn btn-primary w-full">MENU</button
		>
	</div>
	<Drawer />
</div>
