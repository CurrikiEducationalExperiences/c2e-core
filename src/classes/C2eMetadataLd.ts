// create a new class name C2eMetadata which implements metadata interface
import C2eMdCopyrights from "../interfaces/C2eMdCopyrights";
import { C2eMdGeneral } from "../interfaces/C2eMdGeneral";
import { C2eMdLifecycleLd } from "../interfaces/C2eMdLifecycleLd";
import { C2eMetadata } from "../interfaces/C2eMetadata";
import { C2ePersona } from "../interfaces/C2ePersona";
import { C2ePublisherLd } from "../interfaces/C2ePublisherLd";
import JsonLinkedData from "./JsonLinkedData";

class C2eMetadataLd extends JsonLinkedData implements C2eMetadata {
    schemaVersion: string;
    general: C2eMdGeneral;
    author: C2ePersona;
    publisher: C2ePublisherLd;
    lifecycle: C2eMdLifecycleLd;
    copyrights: C2eMdCopyrights;
    
    constructor (identifier: string, typ: string, schemaVersion: string, general: C2eMdGeneral, author: C2ePersona, publisher: C2ePublisherLd, lifecycle: C2eMdLifecycleLd, copyrights: C2eMdCopyrights) {
        super(identifier, typ);
        this.schemaVersion = schemaVersion;
        this.general = general;
        this.author = author;
        this.publisher = publisher;
        this.lifecycle = lifecycle;
        this.copyrights = copyrights;
    }

    setSchemaVersion(schemaVersion: string): void {
        this.schemaVersion = schemaVersion;
    }
    getSchemaVersion(): string | undefined {
        return this.schemaVersion;
    }
    setC2eMdCopyrightsLd(copyrights: C2eMdCopyrights): void {
        this.copyrights = copyrights;
    }
    getC2eMdCopyrightsLd(): C2eMdCopyrights | undefined {
        return this.copyrights
    }
    setC2eLifecycleLd(lifecycle: C2eMdLifecycleLd): void {
        this.lifecycle = lifecycle;
    }
    getC2eLifecycleLd(): C2eMdLifecycleLd | undefined {
        return this.lifecycle;
    }
    setC2ePublisherLd(publisher: C2ePublisherLd): void {
        this.publisher = publisher;
    }
    getC2ePublisherLd(): C2ePublisherLd | undefined {
        return this.publisher;
    }
    setC2eAuthorLd(author: C2ePersona): void {
        this.author = author;
    }
    getC2eAuthorLd(): C2ePersona | undefined {
        return this.author;
    }
    setC2eMdGeneralLd(general: C2eMdGeneral): void {
        this.general = general;   
    }
    getC2eMdGeneralLd(): C2eMdGeneral | undefined {
        return this.general;
    }
    
}

export default C2eMetadataLd;