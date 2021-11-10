<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async ({fetch}) => {
        const res_md_files = await fetch("/index.json");
        if (res_md_files.ok){
            const md_file_slugs: string[] = await res_md_files.json();
            //console.log(`index.svelte-context:module:md_files: ${md_files}`);
            return {props: {md_file_slugs}}
        } else {
            const { message } = await res_md_files.json();
            return {error: new Error(message)};
        }
            
    }

</script>

<script lang="ts">
    export let md_file_slugs: string[];
    //console.log(`md_files:${md_files}`)
    const ARTICLES_DIR_PATH = "/articles"; 
</script>

<h2>ここはホームです</h2>
<div class="links">
    {#each md_file_slugs as md_file_slug}
    <a sveltekit:prefetch href={ARTICLES_DIR_PATH + "/" + md_file_slug}>{md_file_slug}</a>
    {/each}
</div>

<style>
    .links {
        display: flex;
        flex-direction: column;
    }
</style>