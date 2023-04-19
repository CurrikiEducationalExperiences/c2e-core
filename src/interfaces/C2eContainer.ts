import C2eResourceCollection from "./C2eResourceCollection";
import C2eContentTypeCollection from './C2eContentTypeCollection';
import { C2eSourceCode } from "./C2eSourceCode";
import C2eComponentCollection from "./C2eComponentCollection";

export interface C2eContainer {
    c2eResourceCollection: C2eResourceCollection;
    c2eContentTypeCollection: C2eContentTypeCollection;
    c2eComponentCollection: C2eComponentCollection;
    c2eSourceCode: C2eSourceCode;
}