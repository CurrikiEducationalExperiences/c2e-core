import JsonLd from "./JsonLd";

interface C2eComponent extends JsonLd {
    subManifestUrl: string;
    setSubManifestUrl(subManifestUrl: string): void;
    getSubManifestUrl(): string | undefined;
}

export default C2eComponent;