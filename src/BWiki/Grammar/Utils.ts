export const h = (
  tagName: string,
  value: string,
  props: { [propsName in string]: string | null | undefined } = {}
) => {
  const propsArr = Object.entries(props).filter(
    ([key, value]) => value != null
  );
  console.log(propsArr);

  if (propsArr.length === 0) {
    return `<${tagName}>\n${value}\n</${tagName}>`;
  }
  let propText = propsArr
    .map(([key, value]) => {
      if (typeof value === "string" && value !== "") {
        return `${key}="${value}"`;
      }
      return null;
    })
    .filter((v) => v != null)
    .join(" ");

  return `<${tagName} ${propText}>\n${value}\n</${tagName}>`;
};

export function objectAssign<T>(node: any, ...args: any[]) {
  for (const key in node) {
    delete (node as any)[key];
  }
  return Object.assign(node, ...args) as unknown as T;
}
