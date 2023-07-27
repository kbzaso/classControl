<script>
	import { Drawer, Button, CloseButton, A } from 'flowbite-svelte';
	import { sineIn } from 'svelte/easing';
	import { hiddenDrawer } from '$lib/stores.js';

	let transitionParamsBottom = {
		y: 320,
		duration: 200,
		easing: sineIn
	};
</script>

<Drawer
	divClass="overflow-y-auto z-50 p-4 bg-white dark:bg-gray-800 rounded-t-xl"
	placement="bottom"
	width="w-full"
	transitionType="fly"
	transitionParams={transitionParamsBottom}
	bind:hidden={$hiddenDrawer}
	id="sidebar8"
>
	<div class="py-4 overflow-y-auto">
		<ul class="space-y-2 font-medium">
			<li>
				<a
					on:click={() => ($hiddenDrawer = true)}
					href="/agregar-clase"
					class="h-11 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
				>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#595f6e" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
					<span class="flex-1 ml-3 whitespace-nowrap">Agrega clases</span>
				</a>
			</li>
			<li>
				<a
					on:click={() => ($hiddenDrawer = true)}
					href="/"
					class="h-11 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
				>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#595f6e" d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/></svg>
					<span class="flex-1 ml-3 whitespace-nowrap">Próximas clases</span>
				</a>
			</li>
			<li>
				<a
					on:click={() => ($hiddenDrawer = true)}
					href="/perfil"
					class="h-11 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
				>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#595f6e" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88a9.947 9.947 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20z"/></svg>
					<span class="flex-1 ml-3 whitespace-nowrap">Mi perfil</span>
				</a>
			</li>
			<li>
				<button
					on:click
					class="h-11 w-full text-left flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
				>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#595f6e" d="m17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
					<span class="flex-1 ml-3 whitespace-nowrap">Cerrar sesión</span>
				</button>
			</li>
		</ul>
	</div>
	<div class="flex items-center">
		<button on:click={() => ($hiddenDrawer = true)} class="btn btn-terciary w-full place-self-end"
			>Cerrar</button
		>
	</div>
</Drawer>
