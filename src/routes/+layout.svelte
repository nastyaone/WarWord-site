<script lang="ts">
	import '../app.css';
    let { children } = $props();

</script>

<div class="grid grid-rows-[auto_1fr_auto] min-h-screen">

    <header class="sticky top-0 z-10 bg-surface-950 p-4 text-surface-contrast-950 border-primary-400 border-2 rounded-lg">
        <nav class="grid grid-cols-[2fr_auto]">
            <img src="/favicon.svg" alt="Logo" class="h-7 w-7"/>
            <ul class="flex gap-4 justify-end items-center">
                <li><a href="/" class="hover:bg-surface-50 hover:text-surface-contrast-50 p-2 rounded-lg">Home</a></li>
                <li><a href="/manuale" class="hover:bg-surface-50 hover:text-surface-contrast-50 p-2 rounded-lg">Manuale</a></li>
                <li><a href="/storia" class="hover:bg-surface-50 hover:text-surface-contrast-50 p-2 rounded-lg">Storia</a></li>
            </ul>
        </nav>
    </header>

    <div class="flex-1 p-4 ">
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
