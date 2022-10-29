import {
  Table,
  TableCell,
  TableRow,
  Paragraph,
  PhrasingContent,
  Text,
} from "mdast";
import { visit } from "unist-util-visit";
import { objectAssign } from "./Utils";
class BTableCell {
  public static create(nodes: TableCell[]) {
    return new this(nodes);
  }
  constructor(private node: TableCell[] = []) {}
  public toNode() {
    return [];
  }
}
class BTableRow {
  public static create(nodes: TableRow[]) {
    return new this(nodes);
  }
  constructor(private nodes: TableRow[] = []) {}
  public toNode(sep = "|") {
    return [];
  }
}
export default class BTable {
  public static BTableCell = BTableCell;
  public static BTableRow = BTableRow;
  public static create(node: Table) {
    return new this(node);
  }
  private children: PhrasingContent[] = [];
  constructor(private node: Table = { type: "table", children: [] }) {
    this.init();
  }
  public createText(value: string) {
    return { type: "text", value } as Text;
  }
  public init() {
    const { node, createText } = this;

    if (node.children.length != 0) {
      const { children } = node;
      const title = BTableRow.create([children.shift()!]).toNode("!");
      const tableRows = BTableRow.create(children).toNode();
      this.children = [
        createText(
          `{|id="CardSelectTr" class="CardSelect wikitable" style="width: 100%;color: #e8ebdd;border: 2px solid #878787;box-shadow: 0px 0px 3px 2px rgb(0 0 0 / 30%);font-size: 13px;"\n`
        ),
        createText("\n|}<br>"),
      ];
    }

    return this;
  }
  public static toVisit(tree: any) {
    visit<Table, "table">(tree, "table", (node, index, parent) => {
      BTable.create(node).toNode();
      console.log(node);
    });
  }
  public toNode() {
    const { node, children } = this;

    return objectAssign<Paragraph>(node, {
      type: "paragraph",
      children,
    });
  }
}
