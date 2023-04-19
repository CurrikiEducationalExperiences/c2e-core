interface C2eContentTypeAttribute {
    name: string;
    type: string;

    setName(name: string): void;
    getName(): string | undefined;
    setType(type: string): void;
    getType(): string | undefined;
}

export default C2eContentTypeAttribute;