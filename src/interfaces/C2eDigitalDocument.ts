import JsonLd from "./JsonLd";

interface C2eDigitalDocument extends JsonLd {
  url: string;
  fileFormate: string;

  setUrl(url: string): void;
  getUrl(): string;
  setFileFormate(fileFormate: string): void;
  getFileFormate(): string;
}

export default C2eDigitalDocument;