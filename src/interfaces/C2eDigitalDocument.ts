import { JsonLd } from "./JsonLd";

export interface C2eDigitalDocument extends JsonLd {
    url: string;
    fileFormate: string;

    setUrl(url: string): void;
    getUrl(): string;
    setFileFormate(fileFormate: string): void;
    getFileFormate(): string;
  }