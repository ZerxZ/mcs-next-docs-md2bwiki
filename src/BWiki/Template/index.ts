import { replaceNextDoc } from "./NextDoc";
import { replaceReadme } from "./Readme";
export const NEXT_CATALOG = {
  Readme: {
    name: "Next首页",
    replace: replaceReadme,
  },
  Next文档: {
    name: "Patch_Mod_制作文档",
    replace: replaceNextDoc,
  },
};
