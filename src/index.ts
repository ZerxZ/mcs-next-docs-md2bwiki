import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import RemarkBWiki from "./BWiki";
import { readSync } from "to-vfile";
import remarkGfm from "remark-gfm";
//@ts-ignore
import Bot from "./Bot";

async function init() {
  console.log();
  let test = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(RemarkBWiki)
    .use(remarkStringify)
    .process(readSync("./Next/doc/描述文件设置.md", "utf8"));
  // if (!existsSync("./Build")) {
  //   mkdirSync("./Build");
  // }
  // test.path = "./Build/test.bwiki";
  // writeSync(test, "utf-8");
  // console.log(test.value)
  await Bot();
}
init();
