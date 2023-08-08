<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	export let data: PageData;

	console.log(data);
</script>

<main class="w-full mb-10">
	<div>
		<img class="mx-auto my-4" src="/logo.png" alt="Logotipo de la Bóveda Secreta" />
		<div class="w-full flex flex-col items-center gap-4">
			<img
				class="rounded-full h-40 w-40 object-cover"
				src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80"
				alt=""
			/>
			<div class="badge badge-secondary">Nivel Básico</div>
		</div>
		<form
			action="?/update"
			method="POST"
			class="mt-4 flex flex-col gap-4 border border-gray-800 p-4 rounded-xl"
		>
			<label for="name" class="text-gray-600">
				Nombre
				<input
					required
					type="text"
					id="name"
					name="name"
					value={data?.first_name}
					class="input input-bordered input-primary w-full mt-1"
				/></label
			>
			<label for="email" class="text-gray-600">
				Email
				<input
					required
					type="text"
					name="email"
					value={data?.email}
					class="input input-bordered input-primary w-full mt-1"
				/></label
			>
			<label for="foto" class="text-gray-600">
				Fotografía
				<input
					type="file"
					id="foto"
					name="foto"
					class="mt-1 file-input file-input-bordered file-input-primary w-full"
				/>
			</label>
			<label for="plan" class="text-gray-600 flex flex-col gap-1">
				Plan
				<select id="plan" class="select select-primary w-full" required name="plan">
					<option value="1">4 clases menusales</option>
					<option value="2">8 clases mensuales</option>
					<option value="3">12 clases mensuales</option>
					<option value="4">16 clases mensuales</option>
				</select>
			</label>
			<button class="btn bg-yellow-300 text-black" type="submit">Guardar</button>
		</form>
		<div class="space-y-4 mt-8">
			<p>Tu plan comenzó el 30/05/2023 y vence el 30/06/2023</p>
			<p>Te quedan 3 clases disponibles antes de tu renovación.</p>
		</div>
	</div>
</main>
