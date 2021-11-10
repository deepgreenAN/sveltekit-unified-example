import type { RequestHandler } from '@sveltejs/kit';
import fs from "fs"

const ARTICLES_URL = "contents/articles"; 

export const get: RequestHandler = async() => {  // mdファイルのファイル名のリスト
    const md_file_slugs = fs
        .readdirSync(ARTICLES_URL)
        .map((file:string):string=>{return file.split(".")[0]});  // 拡張子を除く
    //console.log(`index.json.ts md_files:${md_files}`);
    return {body: md_file_slugs}
}