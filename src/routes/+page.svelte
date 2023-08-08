<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<main class="self-center">

		<img class="mx-auto mb-8" src="/logo.png" alt="Logotipo de la Bóveda Secreta" />
		<form method="post" use:enhance action="?/login" class="mt-4 flex flex-col gap-4 border border-gray-800 p-4 rounded-xl">
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
					id="password"
					class="input input-bordered input-primary w-full mt-1"
				/></label
			>
			<button class="btn btn-primary" type="submit">Ingresar</button>
		</form>

</main>

<a href="/signup">Create an account</a>
