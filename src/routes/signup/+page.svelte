<script lang="ts">
	import { enhance } from "$app/forms";
</script>

<h1>Sign up</h1>
<main class="self-center">

	<img class="mx-auto mb-8" src="/logo.png" alt="Logotipo de la Bóveda Secreta" />
	<form method="post" use:enhance class="mt-4 flex flex-col gap-4 border border-gray-800 p-4 rounded-xl">
		<label for="first_name" class="text-gray-600">
			Primer nombre
			<input
				required
				type="text"
				id="first_name"
				name="first_name"
				class="input input-bordered input-primary w-full mt-1"
			/></label
		>
		<label for="last_name" class="text-gray-600">
			Apellido
			<input
				required
				type="text"
				id="last_name"
				name="last_name"
				class="input input-bordered input-primary w-full mt-1"
			/></label
		>
		<label for="plan" class="text-gray-600 flex flex-col gap-1">
			Plan
			<select id="plan" class="select select-primary w-full" required name="plan">
				<option value="FOUR">4 clases menusales</option>
				<option value="EIGHT">8 clases mensuales</option>
				<option value="TWELVE">12 clases mensuales</option>
				<option value="SIXTEEN">16 clases mensuales</option>
			</select>
		</label>
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
<a href="/">Sign in</a>