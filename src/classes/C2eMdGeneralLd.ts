import C2eMdGeneral from "../interfaces/C2eMdGeneral";
import JsonLinkedData from "./JsonLinkedData";

export default class C2eMdGeneralLd extends JsonLinkedData implements C2eMdGeneral {
    title: string;
    description: string;
    keywords: Array<string>;

    constructor(identifier: string, typ: string, title: string, description: string, keywords: Array<string>) {
        super(identifier, typ);
        this.title = title;
        this.description = description;
        this.keywords = keywords;
    }

    setDescribtion(description: string): void {
        this.description = description;
    }

    getDescribtion(): string | undefined {
        return this.description;
    }

    addKeyword(keyword: string): void {
        this.keywords.push(keyword);
    }

    removeKeyword(keyword: string): void {
        this.keywords = this.keywords.filter((item) => item !== keyword);
    }

    getKeywords(): string[] | undefined {
        return this.keywords;
    }
}