import {
  Table,
  TableCell,
  TableRow,
  Paragraph,
  PhrasingContent,
  Text,
} from "mdast";
import { visit } from "unist-util-visit";
import {h, objectAssign} from "./Utils";
import {u} from "unist-builder"
import BBase from "./BBase";
import BUrl from "./Url";
class BTableCell extends BBase<TableCell[]> {
  public static CurrentIsTitle:boolean =false;
  public static create(node: any, isTitle: boolean = false) {
    BTableCell.CurrentIsTitle = isTitle;
    return new this(node);
  }
  public toNode() {
    const _node:any[] = []
    const sep = BTableCell.CurrentIsTitle ? "!":"|";
    this.node.forEach(({children,type})=>{

      if (children[0].type == "text" )
      children[0].value = `${sep}${children[0].value}`
      if (children.length !==0) {
        children.push(u("text","\n"))

      }
      const childrens = Object.entries(children);
      for (let [index, child] of childrens) {
        switch (child.type) {
          case "inlineCode":
            child.value = h("code", child.value, {}, false);
            if(index =="0") child.value = `${sep}${child.value}`;
            (child as unknown as Text).type = "text";
            break;
          case "link":
            BUrl.create(child).toNode();
            break;
        }
      }
      _node.push(...children)
    })
    BTableCell.CurrentIsTitle = false;
    return _node;
  }
}
class BTableRow extends BBase<TableRow[]> {
  constructor(
    protected node: TableRow[] = [],
    protected isTitle: boolean
  ) {
    super(node);
  }
  public static create(node: any, isTitle: boolean = false) {
    return new this(node, isTitle);
  }
  public toNode() {
    const {node}=this;

    return node.reduce((p,c,i)=>{
      p.push(u("text","|-\n"),...BTableCell.create(c.children,this.isTitle).toNode())
      return p;
    },[] as any[]);
  }
}
export default class BTable extends BBase<Table> {
  public static BTableCell = BTableCell;
  public static BTableRow = BTableRow;
  private children: PhrasingContent[] = [];

  public createText(value: string="") {
    return u("text",value);
  }

  public init() {
    const { node, createText } = this;

    if (node.children.length != 0) {
      const { children } = node;
      const title = BTableRow.create([children.shift()!], true).toNode();
      const tableRows = BTableRow.create(children).toNode();
      tableRows.pop()
      this.children = [
        createText(
          `{|id="CardSelectTr" class="CardSelect wikitable" style="width: 100%;color: #e8ebdd;border: 2px solid #878787;box-shadow: 0px 0px 3px 2px rgb(0 0 0 / 30%);font-size: 13px;"\n`
        ),
          ...title,
          ...tableRows,
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
