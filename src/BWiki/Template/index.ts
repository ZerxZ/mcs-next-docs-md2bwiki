import { replaceNextDoc } from "./NextDoc";
import { replaceReadme } from "./Readme";

export const NEXT_CATALOG: {
  [props in string]: { name: string; replace: (value: string) => string };
} = {
  Readme: {
    name: "Next首页",
    replace: replaceReadme,
  },
  Next文档: {
    name: "Patch_Mod_制作文档",
    replace: replaceNextDoc,
  },
};
