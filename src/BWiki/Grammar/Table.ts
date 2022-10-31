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
import BBase from "./BBase";
class BTableCell extends BBase<TableCell[]> {
  public toNode() {
    return [];
  }
}
class BTableRow extends BBase<TableRow[]> {
  constructor(
    protected nodes: TableRow[] = [],
    protected sep = "|",
    protected isTitle = false
  ) {
    super(nodes);
  }
  public static create(node: any, sep?: string, isTitle?: boolean) {
    return new this(node, sep, isTitle);
  }
  public toNode() {
    return [];
  }
}
export default class BTable extends BBase<Table> {
  public static BTableCell = BTableCell;
  public static BTableRow = BTableRow;
  private children: PhrasingContent[] = [];

  public createText(value: string) {
    return { type: "text", value } as Text;
  }

  public init() {
    const { node, createText } = this;

    if (node.children.length != 0) {
      const { children } = node;
      const title = BTableRow.create([children.shift()!], "!", true).toNode();
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
      // console.log(node);
    });
  }
  public toNode() {
    this.init();
    const { node, children } = this;

    return objectAssign<Paragraph>(node, {
      type: "paragraph",
      children,
    });
  }
}
