<script lang="ts">
	import Collapse from '$lib/components/Collapse.svelte';
	import type { PageData } from './$types';
	
	export let data: PageData;
	console.log(data);
</script>

<main class="mb-20">
	<span>Bienvenido {data.user.first_name} </span>
	<h1 class="text-2xl font-semibold">Próximas clases</h1>
	{#each data.classes as training}
		<Collapse data={training} userId={data.userId} />
	{/each}
	<button
		class="btn backdrop-blur-xl bg-white/10 border-none rounded-full w-16 h-16 fixed bottom-20 right-6"
		onclick="my_modal_5.showModal()"
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
			><path fill="#f9e710" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg
		>
	</button>
</main>

<!-- ADD USERS -->
<dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
	<form method="dialog" class="modal-box">
		<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		<form action="" class="mt-4 flex flex-col gap-4 p-4">
			<h2 class="text-xl uppercase tracking-widest text-yellow-300 text-center">Agregar clase</h2>
			<label class="text-gray-600" for="start"
				>Fecha

				<input
					type="datetime-local"
					id="start"
					name="trip-start"
					class="input input-bordered input-primary w-full mt-1 text-left"
					min="2023-01-01"
				/>
			</label>

			<label for="plan" class="text-gray-600 flex flex-col gap-1">
				Nivel
				<select class="select select-primary w-full" required name="plan">
					<option>Básico</option>
					<option>Intermedio</option>
					<option>Avanzado</option>
				</select>
			</label>
			<button class="btn btn-success" type="submit">Crear</button>
			<button onclick="my_modal_5.close()" class="btn btn-outline btn-warning" type="reset"
				>Cerrar</button>
		</form>
	</form>
</dialog>
