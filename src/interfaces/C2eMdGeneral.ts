export default interface C2eMdGeneral {
    title: string;
    description: string;
    keywords: Array<string>;

    setDescribtion(description: string): void;
    getDescribtion(): string | undefined;
    addKeyword(keyword: string): void;
    removeKeyword(keyword: string): void;
    getKeywords(): Array<string> | undefined;
}