import { Heading, Paragraph, PhrasingContent } from "mdast";
import { visit } from "unist-util-visit";
import { objectAssign } from "./Utils";
export default class BHeading {
  private children: PhrasingContent[];
  constructor(
    private node: Heading = { type: "heading", depth: 1, children: [] }
  ) {
    this.children = [];
    if (node.depth > 0 && node.children.length > 0) {
      this.init();
    }
  }
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
    const { node, children } = this;
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
  public static create(node: Heading) {
    return new this(node);
  }
}
