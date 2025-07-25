export async function load({ params }) {
    let post
    try {
        post = await import(`../${params.slug}.svx`);
    } catch (e) {
        post = await import(`../${params.slug}.svelte`);
    }
    
    const content = post.default;

    return {
        content
    }
}