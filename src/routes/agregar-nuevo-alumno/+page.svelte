<script>
	import { goto } from '$app/navigation';

	export let data;
	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	let email;
	let password = '123456'

	const handleSignUp = async () => {
		const { data, error } = await supabase.auth.signUp({
			email,
			password
		});
	};
</script>


<main class="">
	<img class="mx-auto mb-8" src="/logo.png" alt="Logotipo de la Bóveda Secreta" />
  <h1 class="text-2xl font-semibold">Agregar nuevo alumno</h1>
	<form
		on:submit={handleSignUp}
		class="mt-4 flex flex-col gap-4 border border-gray-800 p-4 rounded-xl"
	>
		<label for="email" class="text-gray-600">
			Email
			<input
				bind:value={email}
				required
				type="email"
				id="email"
				name="email"
				class="input input-bordered input-primary w-full mt-1"
			/></label
		>
		<!-- <label for="password" class="text-gray-600">
			Password
			<input
				bind:value={password}
				required
				type="password"
				name="password"
				class="input input-bordered input-primary w-full mt-1"
			/></label
		> -->
		<button class="btn bg-yellow-300 text-black" type="submit">Crear usuario</button>
	</form>
</main>
