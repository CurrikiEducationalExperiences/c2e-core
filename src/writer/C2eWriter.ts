import C2eDigitalDocument from "../interfaces/C2eDigitalDocument";
import C2e from "../interfaces/C2e";

export default class C2eWriter {
    c2eResourcesToCreate: Array<{source: string, c2eResource: C2eDigitalDocument}> = [];

    createC2e(c2e: C2e) {
        console.log('create C2e', c2e);
    }

    createC2eResource(source: string, c2eResource: C2eDigitalDocument): C2eDigitalDocument {
        this.c2eResourcesToCreate.push({source, c2eResource});
        return c2eResource;
    }
}