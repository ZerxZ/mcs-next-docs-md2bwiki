import { Code, PhrasingContent, Paragraph } from "mdast";
import { visit } from "unist-util-visit";
import { h } from "./Utils";

export default class BCode {
  constructor(private node: Code) {}
  public toNode() {
    const { node } = this;
    const value = h("syntaxhighlight", node.value, { lang: node.lang });
    for (const key in node) {
      delete (node as any)[key];
    }
    return Object.assign(node, {
      type: "paragraph",
      children: [
        {
          type: "text",
          value,
        } as unknown as Text,
      ],
    }) as unknown as Paragraph;
  }
  public static toVisit(tree: any) {
    visit<Code, "code">(tree, "code", (node, index, parent) => {
      BCode.create(node).toNode();
    });
  }
  public static create(node: Code) {
    return new this(node);
  }
}
