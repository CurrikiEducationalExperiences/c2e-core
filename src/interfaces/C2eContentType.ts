import C2eContentTypeAttribute from "./C2eContentTypeAttribute";
import JsonLd from "./JsonLd";

interface C2eContentType extends JsonLd {
    attributes: Array<C2eContentTypeAttribute>;

    addAttribute(c2eContentTypeAttribute: C2eContentTypeAttribute): void;
    removeAttributes(c2eContentTypeAttribute: C2eContentTypeAttribute): void;
}

export default C2eContentType;