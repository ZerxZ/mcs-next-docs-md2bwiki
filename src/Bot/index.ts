import "dotenv/config";
import { BWikiBot, IBWikiBotOption } from "./bot";
import {existsSync, mkdirSync, readdirSync} from "fs";
import {parse} from "path";

const {
  BOT_USERNAME: username,
  BOT_PASSWORD: password,
  WIKI_NAME,
  WIKI_SITE,
  COOKIES: cookie,
} = process.env;
const apiUrl = `${WIKI_SITE}${WIKI_NAME}/api.php`;

const options: IBWikiBotOption = {
  apiUrl,
  username,
  password,
  cookie,
};

export default async () => {
  const bot = BWikiBot.Create(options);
  await bot.login();
  await bot.init();
  const buildPath = "Build";
  const nextDocPath = "Next/doc";

  if (!existsSync(buildPath)) mkdirSync(buildPath);
  for (const filename of readdirSync(nextDocPath)) {
    const p = parse(filename);
    console.log(p);
    if (p.ext == ".md") {
      let result = await bot.MdToBwiki(filename, nextDocPath);
      let pageName = `鸽子测试-${bot.getPageName(p.name)}`;
      try {
        await bot.edit(pageName, ({ content }) => {
          if (typeof result.value == "string") {
            return content != result.value ? { text: result.value } : {};
          }
          return {};
        });
      } catch {
        if (typeof result.value == "string") {
          await bot.create(pageName, result.value);
        }
      }
    }
  }
  //bot.edit("鸽子测试", (rev) => {
  //  let context = readFileSync("./Build/test.bwiki", "utf8");
  //  return rev.content != context ? { text: context } : {};
  //});
  // await bot.logout();
};
