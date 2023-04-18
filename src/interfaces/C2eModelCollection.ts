import { C2eModel } from "./C2eModel";
import { JsonLd } from "./JsonLd";

export interface C2eModelCollection extends JsonLd {
    c2eResources: [C2eModel];
    addC2eModel(c2eModel: C2eModel): void;
    removeC2eModel(c2eModel: C2eModel): void;
    getC2eModels(): C2eModel[] | undefined;

}