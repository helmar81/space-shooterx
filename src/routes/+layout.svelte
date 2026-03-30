<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import BottomNav from '$lib/BottomNav.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<BottomNav />
