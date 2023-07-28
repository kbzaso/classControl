<script>
	import '../app.css';
	import Drawer from '$lib/components/Drawer.svelte';

	import { hiddenDrawer } from '$lib/stores.js';

	import { goto, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	const handleSignOut = async () => {
		await supabase.auth.signOut();
		$hiddenDrawer = true;
		goto('/');
	};
</script>

<div class="p-4 container pb-20 min-h-screen  grid">
	<slot />
	<Drawer on:click={handleSignOut} />
</div>

{#if session}
	<button
		on:click={() => ($hiddenDrawer = false)}
		class="fixed bottom-0 btn btn-primary h-14 w-full rounded-b-none">MENU</button
	>
{/if}
