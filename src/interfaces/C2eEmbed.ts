import JsonLd from "./JsonLd";

interface C2eEmbed extends JsonLd {
    subManifestUrl: string;
    setSubManifestUrl(subManifestUrl: string): void;
    getSubManifestUrl(): string | undefined;
}

export default C2eEmbed;