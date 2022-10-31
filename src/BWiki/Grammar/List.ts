import {
  Text,
  List,
  ListItem,
  Paragraph,
  PhrasingContent,
  Parent,
} from "mdast";
import { visit } from "unist-util-visit";
import BBase from "./BBase";
import { objectAssign } from "./Utils";
export default class BList extends BBase<List> {
  public toNode() {
    return objectAssign<Paragraph>(this.node, {
      type: "paragraph",
      children: [],
    });
  }
}
