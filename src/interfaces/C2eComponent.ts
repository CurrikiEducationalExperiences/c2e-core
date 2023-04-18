import { JsonLd } from "./JsonLd";

export interface C2eComponent extends JsonLd {
    subManifestUrl: string;
    setSubManifestUrl(subManifestUrl: string): void;
    getSubManifestUrl(): string | undefined;
}