import type { RequestHandler } from '@sveltejs/kit';
import fs from "fs"
import {mdToHtml} from "$lib/convert_markdown";
//const convert_markdown = import("../../lib/convert_markdown");
//const {mdToHtml} = require("../../lib/convert_markdown");

const ARTICLES_DIR_PATH = "contents/articles"; 

export const get: RequestHandler = async ({params}) => {
    const md_str = fs.readFileSync(ARTICLES_DIR_PATH + "/" + params.slug + ".md").toString();
    //console.log(`[slug].json.ts: md_str :${md_str}`);
    const html_with_meta = mdToHtml(md_str);
    //console.log(`[slug].json.ts: html_with_meta:${JSON.stringify(html_with_meta)}`)
    return {body: {...html_with_meta}}
}