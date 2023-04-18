export interface C2eModelAttribute {
    name: string;
    type: string;

    setName(name: string): void;
    getName(): string | undefined;
}