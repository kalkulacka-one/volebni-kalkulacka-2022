import * as domutils from "domutils";
import { Element, Document } from "domhandler";

export function replaceProperty(property: string, whatToReplace: Element, replaceWith: Document) {
  if (
    domutils.hasAttrib(whatToReplace, "property") &&
    domutils.getAttributeValue(whatToReplace, "property") === property
  ) {
    domutils.replaceElement(whatToReplace, replaceWith);
  }
}
