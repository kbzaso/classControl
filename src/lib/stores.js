import { writable, derived } from 'svelte/store';

export let hiddenDrawer = writable(true);
export let classOpenId = writable('');