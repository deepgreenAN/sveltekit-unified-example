<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'
    import type {HtmlWithMeta} from "$lib/convert_markdown";
    //const HtmlWithMeta = require("../../lib/convert_markdown");

    const ARTICLE_URL = "/articles"

    export const load: Load = async({page, fetch}) => {
        const html_with_meta_res = await fetch(ARTICLE_URL + "/" + page.params.slug + ".json");
        if (html_with_meta_res.ok) {
            const html_with_meta = await html_with_meta_res.json();
            //console.log(`[slug].svelte: html_with_meta: ${JSON.stringify(html_with_meta)}`);
            return {props: {html_with_meta}}
        }
    };
</script>

<script lang="ts">
    export let html_with_meta: HtmlWithMeta;
</script>

<svelte:head>
    <title>{html_with_meta.title}</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prism-themes@1.9.0/themes/prism-vsc-dark-plus.css"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.13/dist/katex.min.css" integrity="sha384-RZU/ijkSsFbcmivfdRBQDtwuwVqK7GMOw6IMvKyeWL2K5UAlyp6WonmB8m7Jd0Hn" crossorigin="anonymous">
</svelte:head>

<div>
    {@html html_with_meta.content}
</div>