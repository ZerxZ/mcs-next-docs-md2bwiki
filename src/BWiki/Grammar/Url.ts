import { Link, Text, PhrasingContent, StaticPhrasingContent } from "mdast";
import BBase from "./BBase";
import { objectAssign } from "./Utils";
export default class BUrl extends BBase<Link> {
  public isLocalLink() {
    return !this.isExternalLink();
  }
  public isExternalLink() {
    var regex = /^(file|http)/;
    return regex.test(this.node.url);
  }
  private parseChildren() {
    const {
      node: { children },
      node,
    } = this;

    const _value = { type: "text", value: "" } as Text;
    //console.log(children);

    for (const child of children) {
      switch (child.type) {
        case "emphasis":
          // console.log(child);
          _value.value += "''";
          switch (child.children[0].type) {
            case "strong":
              const strong = child.children[0];
              _value.value += "'''";
              if (strong.children[0].type == "text") {
                _value.value += strong.children[0].value;
              }

              _value.value += "'''";
              break;
            case "text":
              _value.value += child.children[0].value;

              break;
          }
          _value.value += "''";
          break;
        case "strong":
          _value.value += "'''";
          if (child.children[0].type == "text") {
            _value.value += child.children[0].value;
          }

          _value.value += "'''";
          break;
        case "text":
          _value.value += child.value;

          break;
        default:
          break;
      }
    }
    let _chilren: StaticPhrasingContent[] = [_value];
    node.children = _chilren;
  }
  public toNode() {
    const { node } = this;
    const isLocal = this.isLocalLink();
    // console.log(node.url);
    this.parseChildren();
    const title = node.children[0].type == "text" ? node.children[0].value : "";

    return objectAssign<Text>(this.node, {
      type: "text",
      value: isLocal
        ? `[[${node.url.trim().replace(/(\.md$|doc\/)/gim, "")}|${title}]]`
        : `[${node.url} ${title}]`,
    });
  }
}
