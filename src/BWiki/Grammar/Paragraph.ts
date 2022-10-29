import { Paragraph, PhrasingContent } from "mdast";
import { visit } from "unist-util-visit";
export default class BParagraph {
  private children: PhrasingContent[] = [];
  constructor(private node: Paragraph) {
    this.init();
  }
  public init() {
    const { node } = this;
    if (node.children.length === 0) return;
    const childrens = Object.entries(node.children);
    for (let [index, children] of childrens) {
      switch (children.type) {
        case "inlineCode":
          break;
        case "link":
          break;
      }
    }
  }
  public toNode() {
    return this.node;
  }
  public static toVisit(tree: any) {
    visit<Paragraph, "paragraph">(tree, "paragraph", (node) => {
      this.create(node).toNode();
    });
  }
  public static create(node: Paragraph) {
    return new this(node);
  }
}
