import { C2eComponent } from "./C2eComponent";
import { JsonLd } from "./JsonLd";

export interface C2eComponentCollection extends JsonLd {
    c2eComponent: [C2eComponent];
    addC2eComponent(c2eComponent: C2eComponent): void;
    removeC2eComponent(c2eComponent: C2eComponent): void;
    getC2eComponents(): C2eComponent[] | undefined
}