import { Heading, Paragraph, PhrasingContent } from "mdast";
import { visit } from "unist-util-visit";
import BBase from "./BBase";
import { objectAssign } from "./Utils";

export default class BHeading extends BBase<Heading> {
  private children: PhrasingContent[] = [];

  public init() {
    const { node } = this;
    const { depth, children } = node;
    const r = "=".repeat(depth);
    this.children = [
      { type: "text", value: `${r}<kbd>` },
      ...children,
      { type: "text", value: `</kbd>${r}\n<br>` },
    ];
  }
  public toNode() {
    const { node } = this;
    if (node.depth > 0 && node.children.length > 0) {
      this.init();
    }
    const { children } = this;
    return objectAssign<Paragraph>(node, {
      type: "paragraph",
      children,
    });
  }
  public static type = "heading";
  public static toVisit(tree: any) {
    visit<Heading, "heading">(tree, "heading", (node, index, parent) => {
      BHeading.create(node).toNode();
    });
  }
}
