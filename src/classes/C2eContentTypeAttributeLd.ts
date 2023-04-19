import C2eContentTypeAttribute from "../interfaces/C2eContentTypeAttribute";

export class C2eContentTypeAttributeLd implements C2eContentTypeAttribute {
    name: string;
    type: string;

    constructor(name: string, type: string) {
        this.name = name;
        this.type = type;
    }

    setName(name: string): void {
        this.name = name;
    }
    
    getName(): string | undefined {
        return this.name;
    }

    setType(type: string): void {
        this.type = type;
    }

    getType(): string | undefined {
        return this.type;
    }

}