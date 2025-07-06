
<script lang="ts">
	import { X } from '@lucide/svelte/icons';
	import { onMount } from 'svelte';

    let popupOpen = false;

    onMount(() => {
        setTimeout(() => {
            popupOpen = true;
        }, 1000);
    });

    function closePopup() {
        popupOpen = false;
    }

	function downloadManual() {
		const link = "https://docs.google.com/document/d/1fgRGWw8090JlWsBEVaZqVMa-IDWsfLJMi8-7zyH23jI/edit?usp=sharing"
		window.open(link, '_blank');
		closePopup();
	}

</script>

<style>
    @keyframes slideInFromLeft {
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .popup-animate {
        transform: translateX(-100%);
        opacity: 0;
        animation: slideInFromLeft 0.4s ease-out forwards;
    }
</style>


<div class="h-full w-full">
    {#if popupOpen}
        <div class="popup-animate fixed bottom-4 left-4 bg-primary-50 p-6 rounded-lg shadow-xl max-w-80 w-80 z-[1000] text-primary-contrast-50">
            <button 
                class="absolute top-2 right-2 btn-icon preset-filled" 
                on:click={closePopup}
            >
                <X size={16}/>
            </button>
            <p class="mb-4 text-sm leading-relaxed">
                scarica il manuale!
            </p>
            <button 
                class="btn preset-filled-primary-500"
                on:click={downloadManual}
            >
                Scarica
            </button>
        </div>
    {/if}
	<iframe 
		title="WarWord Book" 
		src="https://docs.google.com/document/d/e/2PACX-1vRydmz0o9iYCkbmOVk-Kr455ucWpQmx2Nf_rqiLmrxWwv-KGKzpNEVcIuW5Pk8MgQ5kDEd96nUTkcao/pub?embedded=true"
		class="w-full h-full rounded shadow-lg border"
		frameborder="0"
		allowfullscreen	
	>
	</iframe>
</div>