<script lang="ts">
	import BottomNav from '$lib/BottomNav.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/icon-192.png" type="image/png" />
</svelte:head>

{@render children()}

<BottomNav />
