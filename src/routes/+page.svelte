<script>
    import { goto } from '$app/navigation';
  
      export let data

    </script>

<main class="self-center">

		<img class="mx-auto mb-8" src="/logo.png" alt="Logotipo de la Bóveda Secreta" />
		<form class="mt-4 flex flex-col gap-4 border border-gray-800 p-4 rounded-xl">
			<label for="email" class="text-gray-600">
				Nombre
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
			<button class="btn bg-yellow-300 text-black" type="submit">Ingresar</button>
		</form>

</main>
