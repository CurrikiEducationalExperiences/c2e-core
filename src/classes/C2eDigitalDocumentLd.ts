import C2eDigitalDocument from "../interfaces/C2eDigitalDocument";
import JsonLinkedData from "./JsonLinkedData";
class C2eDigitalDocumentLd extends JsonLinkedData implements C2eDigitalDocument {
    url: string;
    fileFormate: string;

    constructor(identifier: string, type: string, url: string, fileFormate: string) {
        super(identifier, type);
        this.url = url;
        this.fileFormate = fileFormate;
    }

    setUrl(url: string): void {
        this.url = url;
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
}

export default C2eDigitalDocumentLd;