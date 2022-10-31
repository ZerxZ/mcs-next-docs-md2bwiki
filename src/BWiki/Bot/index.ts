if (process.env.isGithub) {
  import("dotenv/config");
}

import { readFileSync } from "fs";
import { IBWikiBotOption, BWikiBot } from "./bot";

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

  bot.edit("鸽子测试", (rev) => {
    let context = readFileSync("./Build/test.bwiki", "utf8");
    return rev.content != context ? { text: context } : {};
  });
  // await bot.logout();
};
