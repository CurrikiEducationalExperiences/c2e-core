import C2eMdCopyrights from "./C2eMdCopyrights";
import { C2eMdGeneral } from "./C2eMdGeneral";
import { C2eMdLifecycleLd } from "./C2eMdLifecycleLd";
import { C2ePersona } from "./C2ePersona";
import { C2ePublisherLd } from "./C2ePublisherLd";

export interface C2eMetadata {
    schemaVersion: string;
    general: C2eMdGeneral;
    author: C2ePersona;
    publisher: C2ePublisherLd;
    lifecycle: C2eMdLifecycleLd;
    copyrights: C2eMdCopyrights;

    setSchemaVersion(schemaVersion: string): void;
    getSchemaVersion(): string | undefined;
    setC2eMdCopyrightsLd(copyrights: C2eMdCopyrights): void;
    getC2eMdCopyrightsLd(): C2eMdCopyrights | undefined;
    setC2eLifecycleLd(lifecycle: C2eMdLifecycleLd): void;
    getC2eLifecycleLd(): C2eMdLifecycleLd | undefined
    setC2ePublisherLd(publisher: C2ePublisherLd): void;
    getC2ePublisherLd(): C2ePublisherLd | undefined;
    setC2eAuthorLd(author: C2ePersona): void;
    getC2eAuthorLd(): C2ePersona | undefined;
    setC2eMdGeneralLd(general: C2eMdGeneral): void;
    getC2eMdGeneralLd(): C2eMdGeneral | undefined;
}