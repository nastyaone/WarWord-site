<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import * as THREE from 'three';
	import NET from 'vanta/dist/vanta.net.min';

	let { children } = $props();
	let vantaElement: HTMLElement;
	let vantaEffect: any;

	onMount(() => {
		vantaEffect = NET({
			el: vantaElement,
			THREE,
			mouseControls: false,
			touchControls: false,
			gyroControls: false,
			scale: 1.0,
			scaleMobile: 1.0,
			color: 0xffffff,
			backgroundColor: 0x0,
			showDots: false,
			camera: {
				fov: 60,
				near: 0.1,
				far: 1000,
				position: {
					x: 0,
					y: 200,
					z: 0
				},
				rotation: {
					x: 0,
					y: 0,
					z: 0
				}
			},
			spacing: 20,
			points: 12,
			maxDistance: 30,
			verticalSpeed: 0,
			horizontalSpeed: 1.0
		});
		return () => {
			if (vantaEffect) vantaEffect.destroy();
		};
	});
</script>

<div class="grid min-h-screen grid-rows-[auto_1fr_auto]">
	<header
		class="bg-surface-950 text-surface-contrast-950 border-primary-400 sticky top-0 z-10 rounded-lg p-4"
	>
		<nav class="flex items-center justify-between gap-4">
			<a
				href="/"
				class="flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-white transition-colors duration-200 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white"
			>
				<img src="/favicon.svg" alt="Logo" class="h-5 w-5" />
				Home
			</a>
			<ul class="flex items-center justify-end gap-4">
				<li>
					<a
						href="/manuale"
						class="rounded-lg px-3 py-2 font-medium text-white transition-colors duration-200 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white"
						>Manuale</a
					>
				</li>
				<li>
					<a
						href="/storia"
						class="rounded-lg px-3 py-2 font-medium text-white transition-colors duration-200 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white"
						>Storia</a
					>
				</li>
			</ul>
		</nav>
	</header>

	<div class="z-1 flex-1 p-4" bind:this={vantaElement}>
		<main class="h-full w-full">
			{#if children}
				{@render children()}
			{:else}
				<p class="text-center text-sm text-gray-500 sm:text-base">No content available.</p>
			{/if}
		</main>
	</div>

	<footer class="bg-surface-950 text-surface-contrast-950 p-4">
		Created with love by <a
			href="https://github.com/TroncoNinja"
			class="text-primary-300 hover:bg-primary-800 rounded-lg p-1 transition-colors hover:text-white"
			>@TroncoNinja</a
		><span class="text-surface-950">Questo sito non è facebook ;)</span>
	</footer>
</div>
