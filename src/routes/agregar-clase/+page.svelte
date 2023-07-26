<main class="w-full mb-10">
	<div>
		<img class="mx-auto my-4" src="/logo.png" alt="Logotipo de la Bóveda Secreta" />
        <h1 class="text-2xl font-semibold">Agregar nueva clase</h1>
		<form action="" class="mt-4 flex flex-col gap-4 p-4 border border-gray-800 rounded-lg">

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
			<button class="btn bg-yellow-300 text-black" type="submit">Crear</button>
		</form>
	</div>
</main>
