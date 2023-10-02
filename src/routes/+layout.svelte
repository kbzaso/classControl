<script>
	import '../app.css';
	import Drawer from '$lib/components/Drawer.svelte';

	import { hiddenDrawer } from '$lib/stores.js';

	export let data;

	console.log(data)

</script>

<div class="p-4 container min-h-screen h-full flex flex-col mx-auto">
		<img class="mx-auto my-4" src="/logo.png" alt="Logotipo de la Bóveda Secreta" />
		<slot />
	<Drawer role={data?.user?.role} />
</div>
{#if data?.session?.sessionId}
	<button
		on:click={() => ($hiddenDrawer = false)}
		class="fixed bottom-0 btn btn-primary h-14 w-full rounded-b-none">MENU</button
	>
{/if}
