<script lang="ts">
	export let level: string;
	export let size: string;
	import { LEVEL } from '$lib/constants/const';
</script>

{#if level == 'BASIC'}
	<div class={`badge badge-secondary ${size ? size : 'badge-sm'}`}>{LEVEL[level]}</div>
{:else if level == 'INTERMEDIATE'}
	<div class={`badge badge-accent ${size ? size : 'badge-sm'}`}>{LEVEL[level]}</div>
{:else if level == 'ADVANCED'}
	<div class={`badge badge-primary ${size ? size : 'badge-sm'}`}>{LEVEL[level]}</div>
{:else if level == 'MASTER'}
	<div class={`badge badge-outline  ${size ? size : 'badge-sm'}`}>{LEVEL[level]}</div>
{/if}
