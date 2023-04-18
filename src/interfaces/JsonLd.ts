interface JsonLd {
  identifier: string;
  type: string;

  setIdentifier(identifier: string): void;
  getIdentifier(): string | undefined;
  setType(type: string): void;
  getType(): string | undefined;
}

export default JsonLd;