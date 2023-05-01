import C2ePersona from "../interfaces/C2ePersona";
import JsonLinkedData from "./JsonLinkedData";

export default class C2eMdCopyrightHolderLd extends JsonLinkedData implements C2ePersona {
    name: string;
    email: string;
    url: string;

    constructor (identifier: string, typ: string, name: string, email: string, url: string) {
        super(identifier, typ);
        this.name = name;
        this.email = email;
        this.url = url;
    }
    
    setName(name: string): void {
        this.name = name;
    }

    getName(): string | undefined {
        return this.name;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    getEmail(): string | undefined {
        return this.email;
    }

    setUrl(url: string): void {
        this.url = url;
    }
    
    getUrl(): string | undefined {
        return this.url;
    }

    toJsonLd(): Object {
        return {
            "@id": this.getIdentifier(),
            "@type": this.getType(),
            name: this.getName(),
            email: this.getEmail(),
            url: this.getUrl()
        };
    }
}