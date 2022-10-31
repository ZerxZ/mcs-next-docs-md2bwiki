import { Paragraph, PhrasingContent } from "mdast";
import { visit } from "unist-util-visit";
import { h } from "./Utils";
import { Text } from "mdast";
import BUrl from "./Url";
import BBase from "./BBase";
export default class BParagraph extends BBase<Paragraph> {
  private children: PhrasingContent[] = [];

  public init() {
    const { node } = this;
    if (node.children.length === 0) return;
    const childrens = Object.entries(node.children);
    for (let [index, children] of childrens) {
      switch (children.type) {
        case "inlineCode":
          children.value = h("code", children.value, {}, false);
          (children as unknown as Text).type = "text";
          break;
        case "link":
          BUrl.create(children).toNode();
          break;
      }
    }
  }
  public toNode() {
    this.init();
    return this.node;
  }
  public static toVisit(tree: any) {
    visit<Paragraph, "paragraph">(tree, "paragraph", (node) => {
      this.create(node).toNode();
    });
  }
}
