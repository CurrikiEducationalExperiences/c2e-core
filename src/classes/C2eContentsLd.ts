import C2eDigitalDocument from "../interfaces/C2eDigitalDocument";
import JsonLinkedData from "./JsonLinkedData";
import {C2E_DATA_CATALOG_TYPE} from "../constants";

class C2eContentsLd extends JsonLinkedData implements C2eDigitalDocument {
    url: string;
    fileFormate: string;

    constructor(c2eId: string, type: string, url: string, fileFormate: string) {
        const identifierUri = 'c2ens:c2eid-' + c2eId + '/content/' + url;
        super(identifierUri, type);
        this.url = '/content/' + url;
        this.fileFormate = fileFormate;
    }

    setUrl(url: string): void {
        this.url = '/content/' + url;
    }

    getUrl(): string {
        return this.url;
    }

    setFileFormate(fileFormate: string): void {
        this.fileFormate = fileFormate;
    }

    getFileFormate(): string {
        return this.fileFormate;
    }

    toJsonLd(): Object {
        return {
            "@id": "c2ens:c2eContents",
            "@type": C2E_DATA_CATALOG_TYPE,
            c2eContents: {
                "@id": this.getIdentifier(),
                "@type": this.getType(),
                url: this.getUrl(),
                fileFormate: this.getFileFormate(),
            }
        };
    }
}

export default C2eContentsLd;