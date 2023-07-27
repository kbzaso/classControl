<script>
    import { goto } from '$app/navigation';
  
      export let data
      let { supabase, session } = data
      $: ({ supabase, session } = data)
    
      let email
      let password
    
      const handleSignIn = async () => {
        await supabase.auth.signInWithPassword({
          email,
          password,
        })
        goto('/horarios')
      }
    </script>

<main class="w-full mb-10">
	<div>
		<img class="mx-auto my-4" src="/logo.png" alt="Logotipo de la Bóveda Secreta" />
		<form on:submit="{handleSignIn}" class="mt-4 flex flex-col gap-4 border border-gray-800 p-4 rounded-xl">
			<label for="email" class="text-gray-600">
				Nombre
				<input
                    bind:value="{email}" 
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
                    bind:value="{password}"
					required
					type="password"
					name="password"
					class="input input-bordered input-primary w-full mt-1"
				/></label
			>
			<button class="btn bg-yellow-300 text-black" type="submit">Ingresar</button>
		</form>
	</div>
</main>
