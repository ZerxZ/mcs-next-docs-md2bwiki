export function replaceNextDoc(value: string) {
  const regex = /\=\<kbd\>Next Patch Mod 制作文档\<\/kbd\>\=/gim;
  const regex1 = /Mod目录结构/gim;
  let text = value;
  if (regex.test(value)) {
    text = value.replace(regex, (key, ...args) => {
      return `=<kbd>Next Patch Mod 制作文档</kbd>=\n{{左侧目录|开始}}\n`;
    });
  }
  if (regex1.test(value)) {
    text = value.replace(regex1, (key, ...args) => {
      return `<font size=4px color=#e8ebdd>Mod目录结构</font>`;
    });
  }
  text += `\n{{左侧目录|结束}}\n\n\n{{Next导航}}\n\n{{#Widget:Next-wiki-css}}`;
  return text;
}
