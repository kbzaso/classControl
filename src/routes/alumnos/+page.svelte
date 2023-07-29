<script>
	import { goto } from '$app/navigation';

	export let data;
</script>

<section class="">
	<img class="mx-auto mb-8" src="/logo.png" alt="Logotipo de la Bóveda Secreta" />
	<h1>Lista de alumnos</h1>
	<ul class=" space-y-4 p-4">
			<li class="flex gap-2 items-center">
				<img
					class="rounded-full h-10 w-10 object-cover"
					src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80"
					alt=""
				/>
				<p>Alejandro Sáez</p>
			</li>
	</ul>
</section>

<button
	class="btn bg-white/10 rounded-full w-16 h-16 absolute bottom-20 right-6"
	onclick="my_modal_5.showModal()"
>
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
		><path fill="#f9e710" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg
	>
</button>

<dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
	<form method="dialog" class="modal-box">
		<h2 class="text-xl uppercase tracking-widest text-yellow-300 text-center">Agregar Alumno</h2>
		<form class="mt-4 flex flex-col gap-4">
			<label for="email" class="text-gray-600">
				Email
				<input
					required
					type="email"
					id="email"
					name="email"
					class="input input-bordered input-primary w-full mt-1"
				/></label
			>
			<label for="password" class="text-gray-600">
				Password
				<input
					required
					type="password"
					name="password"
					class="input input-bordered input-primary w-full mt-1"
				/></label
			>
			<button class="btn bg-yellow-300 text-black" type="submit">Crear usuario</button>
			<button onclick="my_modal_5.close()" class="btn bg-red-300 text-black" type="reset"
				>Cerrar</button
			>
		</form>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
