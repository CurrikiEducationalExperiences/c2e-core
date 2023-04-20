import C2eMdCopyrights from "./C2eMdCopyrights";
import { C2eMdGeneral } from "./C2eMdGeneral";
import { C2eMdLifecycleLd } from "./C2eMdLifecycleLd";
import { C2ePersona } from "./C2ePersona";
import { C2ePublisherLd } from "./C2ePublisherLd";

export interface C2eMetadata {
    schemaVersion: string;
    general: C2eMdGeneral;
    author: C2ePersona;
    copyrights: C2eMdCopyrights;
    publisher: C2ePublisherLd | undefined;
    lifecycle: C2eMdLifecycleLd | undefined;

    setSchemaVersion(schemaVersion: string): void;
    getSchemaVersion(): string;
    
    setC2eMdGeneralLd(general: C2eMdGeneral): void;
    getC2eMdGeneralLd(): C2eMdGeneral;

    setC2eAuthorLd(author: C2ePersona): void;
    getC2eAuthorLd(): C2ePersona;

    setC2eMdCopyrightsLd(copyrights: C2eMdCopyrights): void;
    getC2eMdCopyrightsLd(): C2eMdCopyrights;
    
    setC2ePublisherLd(publisher: C2ePublisherLd): void;
    getC2ePublisherLd(): C2ePublisherLd | undefined;

    setC2eLifecycleLd(lifecycle: C2eMdLifecycleLd): void;
    getC2eLifecycleLd(): C2eMdLifecycleLd | undefined

}