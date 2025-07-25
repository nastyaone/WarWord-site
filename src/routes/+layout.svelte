<script lang="ts">
    import { onMount } from 'svelte';
    import '../app.css';

    let { children } = $props();
    let vantaElement: HTMLElement;
    let vantaEffect: any;

       onMount(() => {
        // Load Three.js
        const threeScript = document.createElement('script');
        threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
        document.head.appendChild(threeScript);

        threeScript.onload = () => {
            // Load Vanta.js after Three.js
            const vantaScript = document.createElement('script');
            vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js';
            document.head.appendChild(vantaScript);

            vantaScript.onload = () => {
                // Initialize Vanta effect
                vantaEffect = (window as any).VANTA.NET({
                    el: vantaElement,
                    mouseControls: false,
                    touchControls: false,
                    gyroControls: false,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    color: 0xffffff,
                    backgroundColor: 0x0,
                    showDots: false,
                    camera: {
                        fov: 60,
                        near: 0.1,
                        far: 1000,
                        position: {
                            x: 0,
                            y: 200, // Higher Y position for top-down view
                            z: 0
                        },
                        rotation: {
                            x: 0,
                            y: 0,
                            z: 0
                        }
                    },
                    // cameraControls: false,
                    spacing: 20,
                    points: 12,
                    maxDistance: 30,
                    verticalSpeed: 0,
                    horizontalSpeed: 1.0
                });
            };
        };

        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    });

</script>

<div class="grid grid-rows-[auto_1fr_auto] min-h-screen">

    <header class="sticky top-0 z-10 bg-surface-950 p-4 text-surface-contrast-950 border-primary-400 rounded-lg">
        <nav class="flex justify-between items-center gap-4">
            <a href="/" class="btn btn-primary flex items-center gap-2 rounded-lg hover:bg-primary-50 hover:text-primary-contrast-50">
                <img src="/favicon.svg" alt="Logo" class="h-5 w-5"/>
                Home
            </a>
            <ul class="flex gap-4 justify-end items-center">
                <li><a href="/manuale" class="btn btn-primary rounded-lg hover:bg-primary-50 hover:text-primary-contrast-50">Manuale</a></li>
                <li><a href="/storia" class="btn btn-primary rounded-lg hover:bg-primary-50 hover:text-primary-contrast-50">Storia</a></li>
            </ul>
        </nav>
    </header>

    <div class="flex-1 p-4 z-1" bind:this={vantaElement}>
        <main class="h-full w-full">
            {#if children}
                {@render children()}
            {:else}
                <p class="text-gray-500 text-center text-sm sm:text-base">No content available.</p>
            {/if}
        </main>
    </div>

    <footer class="bg-primary-50 p-4 text-primary-contrast-50">Created with love by <a href="https://github.com/TroncoNinja" class="text-tertiary-contrast-50 hover:bg-tertiary-50 p-1 rounded-lg">@TroncoNinja</a><span class="text-primary-50">Questo sito non è facebook ;)</span></footer>

</div>
