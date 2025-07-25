<script lang="ts">
    import { slide } from 'svelte/transition';

    let { children, data } = $props();

    const chapters = data.chapters || [];

    let openDropdowns = $state(new Set<number>());

    function toggleDropdown(id: number) {
        const newSet = new Set(openDropdowns);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        openDropdowns = newSet;
    }
</script>

{#snippet NavItem(item: { id: any; title: any; url: any; hasContent: any; subchapters: any; }, level = 0)}
    {@const hasSubchapters = item.subchapters && item.subchapters.length > 0}
    {@const isOpen = openDropdowns.has(item.id)}
    {@const paddingLeft = level * 4 + 4}
    
    <li>
        <div class="flex justify-between space-x-2">
            <a 
                href={item.hasContent ? item.url : undefined}
                class="px-3 py-2 text-sm {item.hasContent ? 'text-primary-200 hover:underline' : 'text-primary-200 cursor-not-allowed pointer-events-none'}"
                style="padding-left: {paddingLeft * 0.25}rem"
                tabindex={item.hasContent ? 0 : -1}
            >
                {item.title}
            </a>
            {#if hasSubchapters}
                <button
                    onclick={() => toggleDropdown(item.id)}
                    class="p-2 px-3 text-primary-200 hover:text-primary-contrast-200 hover:bg-primary-200 rounded-lg transition-colors duration-300"
                    aria-label="Toggle subchapters"
                >
                    <svg 
                        class="w-4 h-4 transform transition-transform {isOpen ? 'rotate-90' : ''}"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                </button>
            {/if}
        </div>
        
        {#if hasSubchapters && isOpen}
            <ul transition:slide={{ duration: 200 }} class="mt-1 space-y-1">
                {#each item.subchapters as subitem}
                    {@render NavItem(subitem, level + 1)}
                {/each}
            </ul>
        {/if}
    </li>
{/snippet}

<div class="grid grid-cols-[1fr_4fr] h-full gap-4">
    <nav class="bg-surface-950/90 border-r border-primary-200 overflow-y-auto rounded-l-lg">
        <div class="p-4">
            <h2 class="text-xl font-bold text-surface-50 mb-4">WarWorld</h2>
            
            <ul class="space-y-1">
                {#each chapters as chapter}
                    {@render NavItem(chapter, 0)}
                {/each}
            </ul>
        </div>
    </nav>
    
    <main class="p-6 bg-surface-950 rounded-lg overflow-y-auto text-surface-50">
        {@render children()}
    </main>
</div>