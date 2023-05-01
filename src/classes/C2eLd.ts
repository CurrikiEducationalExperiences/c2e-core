import { C2e } from "../interfaces/C2e";
import { C2eContainer } from "../interfaces/C2eContainer";
import { C2eMetadata } from "../interfaces/C2eMetadata";
import JsonLinkedData from "./JsonLinkedData";

class C2eLd extends JsonLinkedData implements C2e {
    name: string;
    c2eMetadata: C2eMetadata;
    c2eContainer: C2eContainer;

    constructor(identifier: string, typ: string, name: string, c2eMetadata: C2eMetadata, c2eContainer: C2eContainer) {
        super(identifier, typ);
        this.name = name;
        this.c2eMetadata = c2eMetadata;
        this.c2eContainer = c2eContainer;
    }

    setName(name: string): void {
        this.name = name;
    }

    getName(): string | undefined {
        return this.name;
    }

    setC2eMetadata(c2eMetadata: C2eMetadata): void {
        this.c2eMetadata = c2eMetadata;
    }

    getC2eMetadata(): C2eMetadata | undefined {
        return this.c2eMetadata;
    }

    setC2eContainer(c2eContainer: C2eContainer): void {
        this.c2eContainer = c2eContainer;
    }

    getC2eContainer(): C2eContainer | undefined {
        return this.c2eContainer;
    }
    
    toJsonLd(): Object {
        return {
            "@id": this.identifier,
            "@type": this.type,
            name: this.name,
            c2eMetadata: this.c2eMetadata.toJsonLd(),
        };
    }
}

export default C2eLd;