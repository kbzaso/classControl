<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	export let data: PageData;

	const { form, errors, enhance, delayed } = superForm(data.form, {
		validators: {
			email: (email) => (email.length <= 6 ? 'Ingresa un correo valido' : null),
			password: (password) =>
				password.length < 6 ? 'Contraseña debe superar los 6 caracteres' : null
		}
	});
</script>

<main class="grow flex flex-col justify-center">
	<form
		method="POST"
		use:enhance
		action="?/login"
		class="flex flex-col gap-4 border border-gray-800 p-4 rounded-xl"
	>
		<label for="email" class="text-gray-600">
			Email
			<input
				bind:value={$form.email}
				type="email"
				id="email"
				name="email"
				class="input input-bordered input-primary w-full mt-1"
			/>
		</label>
		{#if $errors.email}
			<span class="flex gap-2 text-warning"
				><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Zm1 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"
					/></svg
				>
				{$errors.email}</span
			>
		{/if}
		<label for="password" class="text-gray-600">
			Password
			<input
				bind:value={$form.password}
				type="password"
				name="password"
				id="password"
				class="input input-bordered input-primary w-full mt-1"
			/>
		</label>
		{#if $errors.password}
			<span class="flex gap-2 text-warning"
				><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Zm1 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"
					/></svg
				>
				{$errors.password}</span
			>
		{/if}
		<button class="btn btn-success" type="submit">
			{#if $delayed}
				<span class="loading loading-spinner" />
			{:else}
				Ingresar
			{/if}
		</button>
	</form>
</main>

<a href="/signup">Create an account</a>
