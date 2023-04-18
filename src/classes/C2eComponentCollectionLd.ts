import C2eComponent from "../interfaces/C2eComponent";
import C2eComponentCollection from "../interfaces/C2eComponentCollection";
import JsonLinkedData from "./JsonLinkedData";

class C2eComponentCollectionLd extends JsonLinkedData implements C2eComponentCollection {
    c2eComponents: Array<C2eComponent>;

    constructor (identifier: string, type: string, c2eComponent: C2eComponent) {
        super(identifier, type);
        this.c2eComponents = [c2eComponent];
    }

    addC2eComponent(c2eComponent: C2eComponent): void {
        this.c2eComponents.push(c2eComponent);    
    }

    removeC2eComponent(c2eComponent: C2eComponent): void {
        this.c2eComponents = this.c2eComponents.filter((c2eComponentEl) => c2eComponentEl.getIdentifier() !== c2eComponent.getIdentifier());
    }

    getC2eComponents(): C2eComponent[] | undefined {
        return this.c2eComponents;
    }
}