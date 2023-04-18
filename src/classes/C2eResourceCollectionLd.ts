import { C2eDigitalDocument } from "../interfaces/C2eDigitalDocument";
import { C2eResourceCollection } from "../interfaces/C2eResourceCollection";
import { C2eDigitalDocumentLd } from "./C2eDigitalDocumentLd";

export class C2eResourceCollectionLd implements C2eResourceCollection {

    identifier: string = "";
    type: string = "";
    c2eResources: C2eDigitalDocument[] = [];

    setIdentifier(identifier: string): void {
      this.identifier = identifier;
    }
  
    getIdentifier(): string | undefined {
      return this.identifier;
    }
  
    setType(type: string): void {
      this.type = type;
    }
  
    getType(): string {
      return this.type;
    }

    addC2eResource(c2eDigitalDocument: C2eDigitalDocument): void {
      this.c2eResources.push(c2eDigitalDocument);
    }
  
    removeC2eResource(c2eDigitalDocument: C2eDigitalDocument): void {
      this.c2eResources = this.c2eResources.filter(resource => resource !== c2eDigitalDocument);
    }
  
    getC2eResources(): C2eDigitalDocument[] | undefined {
      return this.c2eResources.length > 0 ? this.c2eResources : undefined;
    }
  
  }