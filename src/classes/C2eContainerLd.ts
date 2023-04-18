import { C2eComponentCollection } from "../interfaces/C2eComponentCollection";
import { C2eContainer } from "../interfaces/C2eContainer";
import { C2eModelCollection } from "../interfaces/C2eModelCollection";
import { C2eResourceCollection } from "../interfaces/C2eResourceCollection";
import { C2eSourceCode } from "../interfaces/C2eSourceCode";

class C2eContainLd implements C2eContainer {
    c2eResourceCollection: C2eResourceCollection;
    c2eModelCollection: C2eModelCollection;
    c2eComponentCollection: C2eComponentCollection;
    c2eSourceCode: C2eSourceCode;
    
    // constructor
    constructor(c2eResourceCollection: C2eResourceCollection, c2eModelCollection: C2eModelCollection, c2eComponentCollection: C2eComponentCollection, c2eSourceCode: C2eSourceCode) {
        this.c2eResourceCollection = c2eResourceCollection;
        this.c2eModelCollection = c2eModelCollection;
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

    // set and get c2eModelCollection
    setC2eModelCollection(c2eModelCollection: C2eModelCollection): void {
        this.c2eModelCollection = c2eModelCollection;
    }

    getC2eModelCollection(): C2eModelCollection | undefined {
        return this.c2eModelCollection;
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