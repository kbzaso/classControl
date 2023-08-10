<script lang="ts">
	import type { PageData } from './$types';

    export let data: PageData;

    $: ({ user } = data);
</script>

<a href="/alumnos">Back</a>
<h1>Datos de {user?.first_name} {user?.last_name}</h1>