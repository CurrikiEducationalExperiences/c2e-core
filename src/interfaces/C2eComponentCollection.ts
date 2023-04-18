import C2eComponent from "./C2eComponent";
import JsonLd from "./JsonLd";

interface C2eComponentCollection extends JsonLd {
    c2eComponents: Array<C2eComponent>;

    addC2eComponent(c2eComponent: C2eComponent): void;
    removeC2eComponent(c2eComponent: C2eComponent): void;
    getC2eComponents(): C2eComponent[] | undefined
}

export default C2eComponentCollection;