import { Parent } from "mdast";
export default class BBase<T = Parent> {
  /**
   *
   */
  constructor(protected node: T) {}
  public static create(node: any) {
    return new this(node);
  }
  public toNode(): any {
    return this.node;
  }
}
