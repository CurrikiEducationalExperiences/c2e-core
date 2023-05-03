import C2eDigitalDocumentLd from "../classes/C2eDigitalDocumentLd";
import C2eResourceCollectionLd from "../classes/C2eResourceCollectionLd";
import C2eDigitalDocument from "../interfaces/C2eDigitalDocument";
import C2eContentTypeCollectionLd from "../classes/C2eContentTypeCollectionLd";
import C2e from "../interfaces/C2e";
import { C2E_DIGITAL_DOCUMENT_TYPE, C2E_RESOURCE_COLLECTION_ID, C2E_COLLECTION_TYPE, C2E_CONTENT_STRING_DATA_TYPE, C2E_DATASET_TYPE, C2E_CONTENT_TYPE_COLLECTION_ID, C2E_SOURCE_CODE_ID } from "../constants";

export default class C2eWriter {
    c2eId: string;
    c2eResourceCollectionLd: C2eResourceCollectionLd;
    c2eResourcesToCreate: Array<{sourceFilePath: string, c2eResource: C2eDigitalDocument}>;
    c2eContentTypeCollectionLd: C2eContentTypeCollectionLd;

    constructor(c2eId: string) {
        this.c2eId = c2eId;
        this.c2eResourceCollectionLd = new C2eResourceCollectionLd(C2E_RESOURCE_COLLECTION_ID, C2E_COLLECTION_TYPE);
        this.c2eResourcesToCreate = [];
        this.c2eContentTypeCollectionLd = new C2eContentTypeCollectionLd(C2E_CONTENT_TYPE_COLLECTION_ID, C2E_COLLECTION_TYPE);
    }

    createC2e(c2e: C2e) {
        console.log('create C2e', c2e);
    }

    createC2eResource(sourceFilePath: string, targetFilePath: string, MIMEType: string): void {
        const c2eResource: C2eDigitalDocumentLd = this.c2eResourceCollectionLd.addC2eResource(new C2eDigitalDocumentLd(this.c2eId, C2E_DIGITAL_DOCUMENT_TYPE, targetFilePath, MIMEType));
        this.c2eResourcesToCreate.push({sourceFilePath, c2eResource});
    }

    createC2eContentType(contentTypeName: string, contentTypeAttributes: Array<{property: string, type: string}>): void {
        //this.c2eContentTypeCollectionLd.addC2eContentType(contentType, contentDataType);
    }

    //******** temp **********
    getResourceCollection(): C2eResourceCollectionLd {
        return this.c2eResourceCollectionLd;
    }

    getc2eContentTypeCollection(): C2eContentTypeCollectionLd {
        return this.c2eContentTypeCollectionLd;
    }
}