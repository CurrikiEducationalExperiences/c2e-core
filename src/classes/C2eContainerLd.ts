import C2eComponentCollection from "../interfaces/C2eComponentCollection";
import { C2eContainer } from "../interfaces/C2eContainer";
import C2eContentTypeCollection from "../interfaces/C2eContentTypeCollection";
import C2eResourceCollection from "../interfaces/C2eResourceCollection";
import { C2eSourceCode } from "../interfaces/C2eSourceCode";

class C2eContainLd implements C2eContainer {
    c2eResourceCollection: C2eResourceCollection;
    c2eContentTypeCollection: C2eContentTypeCollection;
    c2eComponentCollection: C2eComponentCollection;
    c2eSourceCode: C2eSourceCode;
    
    // constructor
    constructor(c2eResourceCollection: C2eResourceCollection, c2eContentTypeCollection: C2eContentTypeCollection, c2eComponentCollection: C2eComponentCollection, c2eSourceCode: C2eSourceCode) {
        this.c2eResourceCollection = c2eResourceCollection;
        this.c2eContentTypeCollection = c2eContentTypeCollection;
        this.c2eComponentCollection = c2eComponentCollection;
        this.c2eSourceCode = c2eSourceCode;
    }

    // set and get c2eResourceCollection
    setC2eResourceCollection(c2eResourceCollection: C2eResourceCollection): void {
        this.c2eResourceCollection = c2eResourceCollection;
    }

    getC2eResourceCollection(): C2eResourceCollection | undefined {
        return this.c2eResourceCollection;
    }

    // set and get c2eContentTypeCollection
    setC2eContentTypeCollection(c2eContentTypeCollection: C2eContentTypeCollection): void {
        this.c2eContentTypeCollection = c2eContentTypeCollection;
    }

    getC2eContentTypeCollection(): C2eContentTypeCollection | undefined {
        return this.c2eContentTypeCollection;
    }

    // set and get c2eComponentCollection
    setC2eComponentCollection(c2eComponentCollection: C2eComponentCollection): void {
        this.c2eComponentCollection = c2eComponentCollection;
    }

    getC2eComponentCollection(): C2eComponentCollection | undefined {
        return this.c2eComponentCollection;
    }

    // set and get c2eSourceCode
    setC2eSourceCode(c2eSourceCode: C2eSourceCode): void {
        this.c2eSourceCode = c2eSourceCode;
    }

    getC2eSourceCode(): C2eSourceCode | undefined {
        return this.c2eSourceCode;
    }
}