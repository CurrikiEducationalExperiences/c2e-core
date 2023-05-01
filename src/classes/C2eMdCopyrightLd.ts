import C2eDigitalDocument from "../interfaces/C2eDigitalDocument";
import C2eMdCopyright from "../interfaces/C2eMdCopyright";
import C2ePersona from "../interfaces/C2ePersona";
import JsonLinkedData from "./JsonLinkedData";

export default class C2eMdCopyrightLd extends JsonLinkedData implements C2eMdCopyright {
    license: C2eDigitalDocument;
    copyrightHolder: C2ePersona;
    copyrightNotice: string;
    copyrightYear: string;

    constructor (identifier: string, typ: string, license: C2eDigitalDocument, copyrightHolder: C2ePersona, copyrightNotice: string, copyrightYear: string) {
        super(identifier, typ);
        this.license = license;
        this.copyrightHolder = copyrightHolder;
        this.copyrightNotice = copyrightNotice;
        this.copyrightYear = copyrightYear;
    }

    setCopyrightHolder(copyrightHolder: C2ePersona): void {
        this.copyrightHolder = copyrightHolder;
    }

    getCopyrightHolder(): C2ePersona | undefined {
        return this.copyrightHolder;
    }

    setC2eLicense(license: C2eDigitalDocument): void {
        this.license = license;
    }

    getC2eLicense(): C2eDigitalDocument | undefined {
        return this.license;
    }

    setCopyrightNotic(copyrightNotice: string): void {
        this.copyrightNotice = copyrightNotice;
    }

    getCopyrightNotic(): string | undefined {
        return this.copyrightNotice;
    }

    setCopyrightYear(copyrightYear: string): void {
        this.copyrightYear = copyrightYear;
    }

    getCopyrightYear(): string | undefined {
        return this.copyrightYear;
    }

    toJsonLd(): Object {
        return {
            "@id": this.getIdentifier(),
            "@type": this.getType(),
            license: this.getC2eLicense()?.toJsonLd(),
            copyrightHolder: this.getCopyrightHolder(),
            copyrightNotice: this.getCopyrightNotic(),
            copyrightYear: this.getCopyrightYear()
        };
    }
}