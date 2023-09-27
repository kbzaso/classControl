<script lang="ts">
	export let level: string;
	export let size: string;
	import { LEVEL } from '$lib/constants/const';
</script>

{#if level == LEVEL.BASIC}
	<div class={`badge badge-secondary ${size ? size : 'badge-sm'}`}>Básico</div>
{:else if level == LEVEL.INTERMEDIATE}
	<div class={`badge badge-accent ${size ? size : 'badge-sm'}`}>Intermedio</div>
{:else if level == LEVEL.ADVANCED}
	<div class={`badge badge-primary ${size ? size : 'badge-sm'}`}>Avanzado</div>
{:else if level == LEVEL.MASTER}
	<div class={`badge badge-outline  ${size ? size : 'badge-sm'}`}>Profesor/a</div>
{/if}
