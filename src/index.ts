import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import RemarkBWiki from "./BWiki";
import {
  readdirSync,
  readFileSync,
  writeFile,
  existsSync,
  mkdirSync,
} from "fs";
import { toVFile, readSync, writeSync } from "to-vfile";
import remarkGfm from "remark-gfm";
import { downloadWithCheck } from "gdl";
import { NEXT_CATALOG } from "./BWiki/Template";
//@ts-ignore
import Bot from "./BWiki/Bot";

async function init() {
  await downloadWithCheck("https://github.com/magicskysword/Next", "Next");

  console.log();
  let test = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(RemarkBWiki)
    .use(remarkStringify)
    .process(readSync("./Next/doc/描述文件设置.md", "utf8"));
  test.value = (test.value as string).replace(/(\\|&#x20;)/gim, "");
  if (!existsSync("./Build")) {
    mkdirSync("./Build");
  }
  test.path = "./Build/test.bwiki";
  writeSync(test, "utf-8");
  await Bot();
}
init();
