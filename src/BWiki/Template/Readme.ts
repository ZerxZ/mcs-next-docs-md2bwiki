export function replaceReadme(value: string) {
  let text = value;
  text = text.replace("![Next](/preview.png)\n", "");
  text = text.replace("Licenses/NextLICENSE ", "Licenses/Next/LICENSE ");
  text = text.replace(
    /\=\<kbd\>觅长生 Next Mod框架\<\/kbd\>\=/gim,
    (key, ...args) => {
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
    }
  );

  text = text.split("\n").slice(3).join("\n");
  return text;
}
