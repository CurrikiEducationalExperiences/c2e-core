export interface C2eMdGeneral {
    title: string;
    description: string;
    keywords: [string];

    setDescribtion(description: string): void;
    getDescribtion(): string | undefined;
    addKeyword(keywords: [string]): void;
    getKeywords(): string[] | undefined;
}