import { C2eResourceCollection } from "./C2eResourceCollection";
import { C2eModelCollection } from './C2eModelCollection';
import { C2eSourceCode } from "./C2eSourceCode";
import { C2eComponentCollection } from "./C2eComponentCollection";

export interface C2eContainer {
    c2eResourceCollection: C2eResourceCollection;
    c2eModelCollection: C2eModelCollection;
    c2eComponentCollection: C2eComponentCollection;
    c2eSourceCode: C2eSourceCode;
}