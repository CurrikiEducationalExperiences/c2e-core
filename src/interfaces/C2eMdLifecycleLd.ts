import JsonLd from "./JsonLd";

export interface C2eMdLifecycleLd extends JsonLd {
    version: string;
    releaseStatus: string;
    
    setVersion(version: string): void;
    getVersion(): string | undefined;
    setReleaseStatus(releaseStatus: string): void;
    getReleaseStatus(): string | undefined;
    
}