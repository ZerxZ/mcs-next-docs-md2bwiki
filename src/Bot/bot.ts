import {mwn, MwnOptions} from "mwn";
import {existsSync, mkdirSync, readdirSync} from "fs";
import {resolve,parse} from "path";
import {downloadWithCheck} from "gdl";
import {NEXT_CATALOG} from "../BWiki/Template";
import RemarkBWiki from "../BWiki";
import {unified} from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkStringify from "remark-stringify";
import {readSync, writeSync} from "to-vfile";

export interface IBWikiBotOption extends MwnOptions {
    cookie?: string;
}

export class BWikiBot extends mwn {
    public static instance: BWikiBot;
    private _cookie: string[];

    constructor(options: IBWikiBotOption) {
        // console.log(options);
        super(options);
        this._cookie = this.parseCookies(options.cookie);
        this.initCookies();
    }

    public static Create(options: IBWikiBotOption) {
        if (!BWikiBot.instance) BWikiBot.instance = new BWikiBot(options);
        return BWikiBot.instance;
    }

    public async init() {
        await this.getNextGithub();
        const buildPath= "Build";
        const nextDocPath ="Next/doc";

        if(!existsSync(buildPath))mkdirSync(buildPath)
        for (const filename of readdirSync(nextDocPath)) {
            const p = parse(filename)
            console.log(p)
          if (p.ext == ".md"){
              let result = await this.MdToBwiki(filename,nextDocPath);
              let pageName = `鸽子测试-${p.name}`;
              try {  await this.edit(pageName, ({content}) => {
                  if (typeof result.value == "string"){
                      return content != result.value ? {text: result.value} : {};
                  }
                  return {}
              })}
              catch {
                  if (typeof result.value == "string"){
                      await this.create(pageName, result.value)
                  }

              }


          }
        }
    }
public getPageName(key:string){
        return this.hasCatolog(key)? NEXT_CATALOG[key].name :key;}
    private parseCookies(CookieString?: string) {
        return !!CookieString ? CookieString.split(";").map((v) => v.trim()) : [];
    }

    private initCookies() {
        const apiUrl = !!this.options?.apiUrl ? this.options.apiUrl : "";
        const cookieJar = this.cookieJar;
        if (apiUrl) {
            this._cookie.forEach((v) => cookieJar.setCookieSync(v, apiUrl));
        }
    }

    private normalized(text: string = "") {
        return text.replace(/(\\|&#x20;)/gim, "");
    }

    private mcsWikiBottom(text: string = "") {
        return text + `\n\n{{Next导航}}\n\n{{#Widget:Next-wiki-css}}`
    }

    private hasCatolog(key: string) {
        const _key = parse(key)
        return Object.keys(NEXT_CATALOG).includes(_key.name)
    }

    private async MdToBwiki(filename: string, folder = "Next") {
        let result = await unified().use(remarkParse).use(remarkGfm).use(RemarkBWiki).use(remarkStringify).process(readSync(resolve(folder, filename)))
        if (Buffer.isBuffer(result.value)) {
            result.value = result.value.toString()
        }
        result.value = this.normalized(result.value)
        if (this.hasCatolog(filename)){
            const _key = filename.replace(/\.md$/gim, "")
            result.value = NEXT_CATALOG[_key].replace(result.value);
        }

        result.value = this.mcsWikiBottom( result.value)
        return result;
    }

    private async getNextGithub() {
        if (!existsSync(resolve(process.cwd(), "Next")))
            await downloadWithCheck("https://github.com/magicskysword/Next", "Next");
    }
}