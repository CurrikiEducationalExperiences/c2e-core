import { C2eModelAttribute } from "./C2eModelAttribute";
import { JsonLd } from "./JsonLd";

export interface C2eModel extends JsonLd {
    attributes: [C2eModelAttribute];
    relation?: C2eModelAttribute;
    addAttribute(c2eModelAttribute: C2eModelAttribute): void;
    removeAttributes(c2eModelAttribute: C2eModelAttribute): void;
    getAttributes(): C2eModelAttribute[] | undefined;

}