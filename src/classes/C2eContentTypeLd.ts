import C2eContentType from "../interfaces/C2eContentType";
import C2eContentTypeAttribute from "../interfaces/C2eContentTypeAttribute";
import JsonLinkedData from "./JsonLinkedData";

class C2eContentTypeLd extends JsonLinkedData implements C2eContentType {
    attributes: Array<C2eContentTypeAttribute>;
    relation?: string | undefined;

    constructor (identifier: string, type: string, attributes: Array<C2eContentTypeAttribute>, relation?: string | undefined) {
        super(identifier, type);
        this.attributes = attributes;
        this.relation = relation;
    }

    addAttribute(c2eContentTypeAttribute: C2eContentTypeAttribute): void {
        this.attributes.push(c2eContentTypeAttribute);
    }

    removeAttributes(c2eContentTypeAttribute: C2eContentTypeAttribute): void {
        this.attributes = this.attributes.filter((c2eContentTypeAttributeItem) => c2eContentTypeAttributeItem.getName() !== c2eContentTypeAttribute.getName());
    }

    getAttributes(): Array<C2eContentTypeAttribute> {
        return this.attributes;
    }
    
    setRelation(relation: string): void {
        this.relation = relation;
    }

    getRelation(): string | undefined {
        return this.relation;
    }

    toJsonLd (): Object {

        let contentTypeJsonLd: {[key: string]: any} = {
            "@id": this.getIdentifier(), 
            "@type": this.getType()
        };

        this.getAttributes().forEach((c2eContentTypeAttribute: C2eContentTypeAttribute) => {
            contentTypeJsonLd[c2eContentTypeAttribute.getName()] = c2eContentTypeAttribute.getType();
        });
        
        if (this.getRelation() !== undefined) {
            contentTypeJsonLd.relation = this.getRelation();
        }
        
        return contentTypeJsonLd;
    }
}

export default C2eContentTypeLd;