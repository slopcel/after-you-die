<script lang="ts">
	import { onMount } from "svelte";
	import "../app.css";
	import { Toaster } from "svelte-sonner";

	let { children } = $props();
</script>

<Toaster position="top-center" richColors />
{@render children()}
