import { C2eContain } from "./C2eContain";
import { C2eMetadata } from "./C2eMetadata";
import { JsonLd } from "./JsonLd";

export interface C2e extends JsonLd {
    name: string;
    c2eType: string;
    c2eMetadata: C2eMetadata;
    c2eContain: C2eContain;
    
    setName(name: string): void;
    getName() : string | undefined;
    setC2eType(cc2eType: string): void;
    getC2eType() : string | undefined;
    setC2eMetadata(c2eMetadata: C2eMetadata): void;
    getC2eMetadata(): C2eMetadata | undefined;
    setC2eContain(c2eContain: C2eContain): void;
    getC2eContain(): C2eContain | undefined;
}