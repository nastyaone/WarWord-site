<script lang="ts">
    import type { PageData } from './$types';
    
    let { data }: { data: PageData } = $props();
</script>

<div class="prose prose-invert max-w-none">
    {@html data.content}
</div>