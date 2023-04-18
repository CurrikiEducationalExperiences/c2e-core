import { C2eContainer } from "./C2eContainer";
import { C2eMetadata } from "./C2eMetadata";
import JsonLd from "./JsonLd";

export interface C2e extends JsonLd {
    name: string;
    c2eMetadata: C2eMetadata;
    c2eContainer: C2eContainer;
    
    setName(name: string): void;
    getName() : string | undefined;
    setC2eMetadata(c2eMetadata: C2eMetadata): void;
    getC2eMetadata(): C2eMetadata | undefined;
    setC2eContainer(c2eContainer: C2eContainer): void;
    getC2eContainer(): C2eContainer | undefined;
}