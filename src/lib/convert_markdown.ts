import unified from "unified"
import remarkParse from "remark-parse"
import remarkFrontMatter from "remark-frontmatter"
import remarkExtractFrontMatter from "remark-extract-frontmatter"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import remarkPrism from "remark-prism"
import remarkRehype from "remark-rehype"
import rehypeRaw from "rehype-raw"
import rehypeKatex from "rehype-katex"
import rehypeStringify from "rehype-stringify"
import yaml from "yaml"

interface HtmlWithMeta {
    content: string,
    title: string
}

interface FrontMatter {
    title: string
}

function mdToHtml (md: string):HtmlWithMeta {
    const processer = unified()
        .use(remarkParse)
        .use(remarkFrontMatter)
        .use(remarkExtractFrontMatter, {yaml: yaml.parse})
        .use(remarkGfm)
        .use(remarkMath)
        .use(remarkPrism)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeKatex, {throwOnError: true})
        .use(rehypeStringify);

    const vfile = processer.processSync(md);

    const html_with_meta: HtmlWithMeta = {
        content: vfile.toString(),
        title: (vfile.data as FrontMatter).title,
        //title: "タイトルです"
    }
    // const html_with_meta: HtmlWithMeta = {
    //     content: "内容です",
    //     title: "タイトルです"
    // };

    return html_with_meta
};

//export default {mdToHtml};
export {mdToHtml};
export type {HtmlWithMeta};