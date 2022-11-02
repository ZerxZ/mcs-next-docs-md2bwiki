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

};
