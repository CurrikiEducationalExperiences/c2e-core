import { C2E_COLLECTION_TYPE } from "../constants";
import C2eContentDocumentLd from "./C2eContentDocumentLd";
import JsonLinkedData from "./JsonLinkedData";

class C2eContentsCollectionLd extends JsonLinkedData {
    private c2eContents: Array<C2eContentDocumentLd> = [];
    private counter: number = 0;

    constructor() {
        const identifier = 'c2ens:c2eContents';
        const type = C2E_COLLECTION_TYPE;
        super(identifier, type);
    }

    incrementCounter(): void {
        this.counter++;
    }

    getCounter(): number {
        return this.counter;
    }

    addC2eContent(c2eContent: C2eContentDocumentLd): void {
        this.incrementCounter();
        c2eContent.setIndex(this.getCounter());
        this.c2eContents.push(c2eContent);
    }

    getC2eContents(): C2eContentDocumentLd[] {
        return this.c2eContents;
    }

    toJsonLd(): Object {
        return {
            "@id": this.getIdentifier(),
            "@type": this.getType(),
            c2eContents: this.getC2eContents().map((c2eContent: C2eContentDocumentLd) => {
                return c2eContent.toJsonLd();
            })
        };
    }
}

export default C2eContentsCollectionLd;