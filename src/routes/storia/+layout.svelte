<script lang="ts">
    import { slide } from 'svelte/transition';

    let { children } = $props();

    // Example data structure for chapters and subchapters
    let chapters = [
        {
            id: 1,
            title: 'Chapter 1: Introduction',
            url: '/storia/chapter-1',
            subchapters: [
                { id: 11, title: '1.1 Overview', url: '/storia/chapter-1/overview' },
                { id: 12, title: '1.2 Background', url: '/storia/chapter-1/background',
                    subchapters: [
                        { id: 121, title: '1.2.1 Historical Context', url: '/storia/chapter-1/background/historical' ,
						  subchapters: [
							  { id: 1211, title: '1.2.1.1 Ancient History', url: '/storia/chapter-1/background/historical/ancient' },
							  { id: 1212, title: '1.2.1.2 Medieval History', url: '/storia/chapter-1/background/historical/medieval' },
							  { id: 1213, title: '1.2.1.3 Modern History', url: '/storia/chapter-1/background/historical/modern' }
						  ]
						},
                        { id: 122, title: '1.2.2 Modern Context', url: '/storia/chapter-1/background/modern' }
                    ]
                }
            ]
        },
        {
            id: 2,
            title: 'Chapter 2: Development',
            url: '/storia/chapter-2',
            subchapters: [
                { id: 21, title: '2.1 Early Stage', url: '/storia/chapter-2/early' },
                { id: 22, title: '2.2 Growth', url: '/storia/chapter-2/growth' }
            ]
        },
        {
            id: 3,
            title: 'Chapter 3: Conclusion',
            url: '/storia/chapter-3',
            subchapters: []
        }
    ];

    let openDropdowns = $state(new Set());

    function toggleDropdown(id: number) {
        if (openDropdowns.has(id)) {
            openDropdowns.delete(id);
        } else {
            openDropdowns.add(id);
        }
        // Trigger reactivity by reassigning the Set
        openDropdowns = new Set(openDropdowns);
    }
</script>

{#snippet NavItem(item: { id: any; title: any; url: any; subchapters: any; }, level = 0)}
    {@const hasSubchapters = item.subchapters && item.subchapters.length > 0}
    {@const isOpen = openDropdowns.has(item.id)}
    {@const paddingLeft = level * 4 + 4}
    
    <li>
        <div class="flex items-center">
            <a 
                href={item.url}
                class="flex-1 px-3 py-2 text-sm {level === 0 ? 'font-medium' : ''} text-surface-{level === 0 ? '700' : '600'}-{level === 0 ? '200' : '300'}-token hover:bg-surface-200-700-token rounded-token transition-colors"
                style="padding-left: {paddingLeft * 0.25}rem"
            >
                {item.title}
            </a>
            {#if hasSubchapters}
                <button
                    onclick={() => toggleDropdown(item.id)}
                    class="p-2 text-surface-500-400-token hover:text-surface-700-200-token transition-colors"
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

<div class="grid grid-cols-[1fr_4fr] h-full">
    <nav class="bg-surface-100-800-token border-r border-surface-300-600-token overflow-y-auto">
        <div class="p-4">
            <h2 class="text-xl font-bold text-surface-900-50-token mb-4">WarWorld</h2>
            
            <ul class="space-y-1">
                {#each chapters as chapter}
                    {@render NavItem(chapter, 0)}
                {/each}
            </ul>
        </div>
    </nav>
    
    <main class="p-6 bg-surface-50-900-token">
        {@render children()}
    </main>
</div>