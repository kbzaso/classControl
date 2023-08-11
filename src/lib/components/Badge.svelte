<script lang="ts">
    export let text: string;
    export let size: string;
</script>

<div class={`badge badge-primary ${size ? size : 'badge-sm'}`}>Nivel {text}</div>