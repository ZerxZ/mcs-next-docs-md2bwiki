import { List, Paragraph, Table } from "mdast";
import { visit } from "unist-util-visit";
import BBase from "./BBase";
import { objectAssign } from "./Utils";

export default class BList extends BBase<List> {
  public static toVisit(tree: any) {
    visit<Table, "list">(tree, "list", (node, index, parent) => {
      BList.create(node).toNode();
      // console.log(node);
    });
  }
  public toNode() {
    const init = this.node.ordered ? "#" : "*";
    return objectAssign<Paragraph>(this.node, {
      type: "paragraph",
      children: [],
    });
  }
}
