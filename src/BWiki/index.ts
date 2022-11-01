import type { Plugin } from "unified";
import type { Root, Heading, Paragraph, Code, Text, Table } from "mdast";
export type Options = import("mdast-util-from-markdown").Options;

import BHeading from "./Grammar/Heading";
import BCode from "./Grammar/Code";
import BTable from "./Grammar/Table";
import BParagraph from "./Grammar/Paragraph";
import BList from "./Grammar/List";

const RemarkBWiki: Plugin<[Options?], string, Root> = (options) => {
  return function transformer(tree: any, vfile: any) {
    BHeading.toVisit(tree);
    BParagraph.toVisit(tree);
    BCode.toVisit(tree);
    BTable.toVisit(tree);
    return tree;
  };
};

export default RemarkBWiki;
