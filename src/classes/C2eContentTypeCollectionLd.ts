import C2eContentType from "../interfaces/C2eContentType";
import C2eContentTypeCollection from "../interfaces/C2eContentTypeCollection";
import JsonLinkedData from "./JsonLinkedData";

export class C2eContentTypeCollectionLd extends JsonLinkedData implements C2eContentTypeCollection {
    c2eContentTypes: Array<C2eContentType>;

    constructor(identifier: string, type: string, c2eContentTypes: Array<C2eContentType>) {
        super(identifier, type);
        this.c2eContentTypes = c2eContentTypes;
    }

    addC2eContentType(c2eContentType: C2eContentType): void {
        this.c2eContentTypes.push(c2eContentType);
    }

    removeC2eContentType(c2eContentType: C2eContentType): void {
        this.c2eContentTypes = this.c2eContentTypes.filter((c2eContentTypeItem: C2eContentType) => {
            return c2eContentTypeItem.getIdentifier() !== c2eContentType.getIdentifier();
        });    
    }

    getC2eContentTypes(): C2eContentType[] | undefined {
        return this.c2eContentTypes;
    }
    
}