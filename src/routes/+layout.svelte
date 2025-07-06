<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';


    let { children } = $props();
    let vantaElement: HTMLDivElement;
    let vantaEffect: any;

    onMount(() => {
        // Load scripts dynamically
        const loadScript = (src: string) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        };

        const initVanta = async () => {
            try {
                await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
                await loadScript('https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.net.min.js');
                
                // @ts-ignore
                vantaEffect = window.VANTA.NET({
                    el: vantaElement,
                    mouseControls: false,
                    touchControls: false,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00,
					color: 0xffffff,
					backgroundColor: 0x000000
                });
            } catch (error) {
                console.error('Failed to load Vanta.js:', error);
            }
        };

        initVanta();

        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    });
</script>

<div class="relative h-screen w-screen bg-black overflow-hidden p-5" bind:this={vantaElement}>
    <div class="relative z-10 flex items-center justify-center bg-white/80 rounded-lg shadow-lg h-full w-full p-4">
        {@render children()}
    </div>
</div>
