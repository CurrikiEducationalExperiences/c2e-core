import C2eDigitalDocument from "../interfaces/C2eDigitalDocument";
import JsonLinkedData from "./JsonLinkedData";

class C2eDigitalDocumentLd extends JsonLinkedData implements C2eDigitalDocument {
    url: string;
    fileFormate: string;

    constructor(c2eId: string, type: string, url: string, fileFormate: string) {
        const identifierUri = 'c2ens:c2eid-' + c2eId + '/resources/' + url;
        super(identifierUri, type);
        this.url = '/resources/' + url;
        this.fileFormate = fileFormate;
    }

    setUrl(url: string): void {
        this.url = '/resources/' + url;
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
            "@id": this.getIdentifier(),
            "@type": this.getType(),
            url: this.getUrl(),
            fileFormate: this.getFileFormate(),
        };
    }
}

export default C2eDigitalDocumentLd;