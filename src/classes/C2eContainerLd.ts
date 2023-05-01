import C2eContainer from "../interfaces/C2eContainer";
import C2eContentTypeCollection from "../interfaces/C2eContentTypeCollection";
import C2eResourceCollection from "../interfaces/C2eResourceCollection";
import C2eEmbedCollection from "../interfaces/C2eEmbedCollection";
import C2eSourceCode from "../interfaces/C2eSourceCode";

class C2eContainLd implements C2eContainer {
    c2eResourceCollection: C2eResourceCollection;
    c2eContentTypeCollection: C2eContentTypeCollection;
    c2eEmbedCollection?: C2eEmbedCollection | undefined;
    c2eSourceCode?: C2eSourceCode | undefined;
    
    // constructor
    constructor(c2eResourceCollection: C2eResourceCollection, c2eContentTypeCollection: C2eContentTypeCollection, c2eSourceCode?: C2eSourceCode | undefined, c2eEmbedCollection?: C2eEmbedCollection | undefined) {
        this.c2eResourceCollection = c2eResourceCollection;
        this.c2eContentTypeCollection = c2eContentTypeCollection;
        this.c2eEmbedCollection = c2eEmbedCollection;
        this.c2eSourceCode = c2eSourceCode;
    }

    // set and get c2eResourceCollection
    setC2eResourceCollection(c2eResourceCollection: C2eResourceCollection): void {
        this.c2eResourceCollection = c2eResourceCollection;
    }

    getC2eResourceCollection(): C2eResourceCollection {
        return this.c2eResourceCollection;
    }

    // set and get c2eContentTypeCollection
    setC2eContentTypeCollection(c2eContentTypeCollection: C2eContentTypeCollection): void {
        this.c2eContentTypeCollection = c2eContentTypeCollection;
    }

    getC2eContentTypeCollection(): C2eContentTypeCollection {
        return this.c2eContentTypeCollection;
    }

    // set and get c2eEmbedCollection
    setC2eEmbedCollection(c2eEmbedCollection: C2eEmbedCollection): void {
        this.c2eEmbedCollection = c2eEmbedCollection;
    }

    getC2eEmbedCollection(): C2eEmbedCollection | undefined {
        return this.c2eEmbedCollection;
    }

    // set and get c2eSourceCode
    setC2eSourceCode(c2eSourceCode: C2eSourceCode): void {
        this.c2eSourceCode = c2eSourceCode;
    }

    getC2eSourceCode(): C2eSourceCode | undefined{
        return this.c2eSourceCode;
    }

    toJsonLd() : Array<Object> {
        return [
            {
                c2eResources : this.getC2eResourceCollection().toJsonLd()
            }
        ];
    }
}

export default C2eContainLd;