import C2eDigitalDocument from "../interfaces/C2eDigitalDocument";
import C2eResourceCollection from "../interfaces/C2eResourceCollection";
import { C2eDigitalDocumentLd } from "./C2eDigitalDocumentLd";
import JsonLinkedData from "./JsonLinkedData";
export default class C2eResourceCollectionLd extends JsonLinkedData implements C2eResourceCollection {

    identifier: string = "";
    type: string = "";
    c2eResources: C2eDigitalDocument[] = [];

    constructor(identifier: string, type: string, c2eResources: C2eDigitalDocument[]) {
      super(identifier, type);
      this.c2eResources = c2eResources;
    }
    
    addC2eResource(c2eDigitalDocument: C2eDigitalDocument): void {
      this.c2eResources.push(c2eDigitalDocument);
    }
  
    removeC2eResource(c2eDigitalDocument: C2eDigitalDocument): void {
      this.c2eResources = this.c2eResources.filter(resource => resource.getIdentifier() !== c2eDigitalDocument.getIdentifier());
    }
  
    getC2eResources(): C2eDigitalDocument[] | undefined {
      return this.c2eResources.length > 0 ? this.c2eResources : undefined;
    }
  
  }

