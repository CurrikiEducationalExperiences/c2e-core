import { JsonLd } from "./JsonLd";

export interface C2eSourceCode extends JsonLd {
    scriptUrl: string;
    htmlUrl: string;

    setScriptUrl(scriptUrl: string): void;
    getScriptUrl(): string | undefined;
    setHtmlUrl(htmlUrl: string): void;
    getHtmlUrl(): string|undefined
}