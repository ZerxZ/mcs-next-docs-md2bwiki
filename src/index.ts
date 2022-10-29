import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import RemarkBWiki from "./BWiki";
import { readdirSync, readFileSync, writeFile } from "fs";
import remarkGfm from "remark-gfm";
import { downloadWithCheck } from "gdl";

async function init() {
  // await downloadWithCheck(
  //   "https://github.com/magicskysword/Next",
  //   "Next"
  // );
  //const md = readFileSync("test.md", { encoding: "utf-8" });
  console.log(readdirSync("./Next/doc"));
  console.log(readdirSync("./Next"));
  //let test = await unified()
  //  .use(remarkParse)
  //  .use(remarkGfm)
  //  .use(RemarkBWiki)
  //  .use(remarkStringify)
  //  .process(md);
  //const result = (test.value as string).replace(/(\\|&#x20;)/gim, "");
  //writeFile("test.wiki", result, (err) => err && console.log(err));
  //console.log(result);
}
init();
