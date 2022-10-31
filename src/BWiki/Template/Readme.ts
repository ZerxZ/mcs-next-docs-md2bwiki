export function replaceReadme(value: string) {
  const regex = /\=\<kbd\>觅长生 Next Mod框架\<\/kbd\>\=/gim;
  let text = value;
  if (regex.test(value)) {
    text = value.replace(regex, (key, ...args) => {
      return `__NOTOC__

<div class="visible-xs">
${key}
<br>
[[File:nextMOD_logo.png|center|link=]]<br>
</div>

<div class="visible-md visible-sm visible-lg">
{{:沙盒/next之我要迫害剑圣之创意工坊}}
</div>
`;
    });
    text += `\n\n{{Next导航}}\n\n{{#Widget:Next-wiki-css}}`;
  }
  return text;
}
