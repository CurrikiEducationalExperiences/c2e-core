import C2eDigitalDocumentLd from "../classes/C2eDigitalDocumentLd";
import C2eResourceCollectionLd from "../classes/C2eResourceCollectionLd";
import C2eDigitalDocument from "../interfaces/C2eDigitalDocument";
import C2eContentTypeCollectionLd from "../classes/C2eContentTypeCollectionLd";
import C2eContentTypeAttributeLd from "../classes/C2eContentTypeAttributeLd";
import C2eContentTypeLd from "../classes/C2eContentTypeLd";
import C2eSourceCodeDocumentLd from "../classes/C2eSourceCodeDocumentLd";
import C2eSourceCodeLd from "../classes/C2eSourceCodeLd";
import C2eContainerLd from "../classes/C2eContainerLd";
import C2eMdGeneralLd from "../classes/C2eMdGeneralLd";
import C2eAuthorLd from "../classes/C2eAuthorLd";
import C2e from "../interfaces/C2e";
import { C2E_DIGITAL_DOCUMENT_TYPE, C2E_RESOURCE_COLLECTION_ID, C2E_COLLECTION_TYPE, C2E_DATASET_TYPE, C2E_CONTENT_TYPE_COLLECTION_ID, C2E_SOURCE_CODE_ID, C2E_PERSON_TYPE, C2E_ORGANIZATION_TYPE, C2E_CODE_TYPE, C2E_CREATIVE_WORK_TYPE } from "../constants";
import C2ePublisherLd from "../classes/C2ePublisherLd";
import C2eMdCopyrightHolderLd from "../classes/C2eMdCopyrightHolderLd";
import C2eMdCopyrightLd from "../classes/C2eMdCopyrightLd";
import C2eMdLifecycleLd from "../classes/C2eMdLifecycleLd";
import C2eMetadataLd from "../classes/C2eMetadataLd";
import C2eLd from "../classes/C2eLd";
import C2eContentsLd from "../classes/C2eContentsLd";


export default class C2eWriter {
    private c2eId: string;
    private c2eResourceCollectionLd: C2eResourceCollectionLd;
    private c2eResourcesToCreate: Array<{sourceFilePath: string, c2eResource: C2eDigitalDocument}>;
    private c2eContentTypeCollectionLd: C2eContentTypeCollectionLd;
    private c2eMetadata: C2eMetadataLd;
    private c2eContents: C2eDigitalDocument;
    private c2e: C2eLd;

    constructor(c2eId: string) {
        this.c2eId = c2eId;
        this.c2eResourceCollectionLd = new C2eResourceCollectionLd(C2E_RESOURCE_COLLECTION_ID, C2E_COLLECTION_TYPE);
        this.c2eResourcesToCreate = [];
        this.c2eContentTypeCollectionLd = new C2eContentTypeCollectionLd(C2E_CONTENT_TYPE_COLLECTION_ID, C2E_COLLECTION_TYPE);
        this.c2eMetadata = new C2eMetadataLd(this.c2eId, C2E_DATASET_TYPE);
        this.c2e = new C2eLd(this.c2eId, C2E_CREATIVE_WORK_TYPE);
        this.c2eContents = new C2eContentsLd(this.c2eId, C2E_DIGITAL_DOCUMENT_TYPE, 'contents.json', 'application/json');
    }

    createC2e() {
        this.c2e.setC2eMetadata(this.getMetadata());
        this.c2e.setC2eContainer(this.getContainer());
    }

    createC2eResource(sourceFilePath: string, targetFilePath: string, MIMEType: string): void {
        const c2eResource: C2eDigitalDocumentLd = this.c2eResourceCollectionLd.addC2eResource(new C2eDigitalDocumentLd(this.c2eId, C2E_DIGITAL_DOCUMENT_TYPE, targetFilePath, MIMEType));
        this.c2eResourcesToCreate.push({sourceFilePath, c2eResource});
    }

    createC2eContentType(contentTypeName: string, contentTypeAttributes: Array<{property: string, type: string}>): void {
        if (contentTypeAttributes.length > 0) {
            const contentTypeAttributeList = contentTypeAttributes.map((contentTypeAttribute) => { 
                const attribute = new C2eContentTypeAttributeLd(contentTypeAttribute.property, contentTypeAttribute.type) 
                return attribute;
            });
            const contentType = new C2eContentTypeLd( this.c2eId, contentTypeName, contentTypeAttributeList);
            this.c2eContentTypeCollectionLd.addC2eContentType(contentType);
        }
    }

    createC2eMetadata(metadata: 
            {
                version?: string,
                general: { title: string, description: string, keywords?: Array<string> }, 
                author: { name: string, email: string, url?: string },
                publisher?: { name: string, email: string, url?: string },
                license?: { file: string, type: string },
                copyrightHolder?: { name: string, email: string, url?: string },
                copyrightNote?: string,
                copyrightYear?: string,
                codeVersion?: string,
                codeStatus?: string,
            }
        ): void 
    {
        const c2eMdGeneralLd = new C2eMdGeneralLd(this.c2eId, C2E_DATASET_TYPE, metadata.general.title, metadata.general.description, (metadata.general.keywords ? metadata.general.keywords : []));
        const c2eAuthorLd = new C2eAuthorLd(this.c2eId, C2E_PERSON_TYPE, metadata.author.name, metadata.author.email, metadata.author.url ? metadata.author.url : '');
        const c2ePublisherLd = new C2ePublisherLd(this.c2eId , C2E_ORGANIZATION_TYPE, (metadata.publisher?.name ? metadata.publisher?.name : ''), (metadata.publisher?.email ? metadata.publisher?.email : ''), (metadata.publisher?.url ? metadata.publisher?.url : ''));
        const c2eMdCopyrightHolderLd = new C2eMdCopyrightHolderLd(this.c2eId, C2E_PERSON_TYPE, (metadata.copyrightHolder?.name ? metadata.copyrightHolder?.name : ''), (metadata.copyrightHolder?.email ? metadata.copyrightHolder?.email : ''), (metadata.copyrightHolder?.url ? metadata.copyrightHolder?.url : ''));
        const c2eLicenseDigitalDocumentLd = new C2eDigitalDocumentLd(this.c2eId, C2E_DIGITAL_DOCUMENT_TYPE, (metadata.license?.file ? metadata.license?.file : '') , (metadata.license?.type ? metadata.license?.type : ''));
        const c2eMdCopyrightLd = new C2eMdCopyrightLd(this.c2eId, C2E_DATASET_TYPE, c2eLicenseDigitalDocumentLd, c2eMdCopyrightHolderLd, (metadata?.copyrightNote ? metadata?.copyrightNote : ''), (metadata?.copyrightYear ? metadata?.copyrightYear : ''));
        const c2eMdLifecycleLd = new C2eMdLifecycleLd(this.c2eId, C2E_CODE_TYPE, (metadata?.codeVersion ? metadata?.codeVersion : 'v1.0'), (metadata?.codeStatus ? metadata?.codeStatus : ''));
        this.c2eMetadata.setC2eMdGeneralLd(c2eMdGeneralLd);
        this.c2eMetadata.setC2eAuthorLd(c2eAuthorLd);
        this.c2eMetadata.setC2eMdCopyrightLd(c2eMdCopyrightLd);
        this.c2eMetadata.setC2ePublisherLd(c2ePublisherLd);
        this.c2eMetadata.setC2eLifecycleLd(c2eMdLifecycleLd);
        this.c2eMetadata.setSchemaVersion(metadata?.version ? metadata.version : 'v1.0');
    }

    getReaderSourceCode(): C2eSourceCodeLd {
        const htmlDocument = new C2eSourceCodeDocumentLd(this.c2eId, 'index.html', 'text/html');
        const javascriptDocument = new C2eSourceCodeDocumentLd(this.c2eId, 'index.js', 'application/javascript');
        const c2eSourceCode = new C2eSourceCodeLd(C2E_SOURCE_CODE_ID, C2E_COLLECTION_TYPE, htmlDocument, javascriptDocument);
        return c2eSourceCode;
    }

    getContainer() {
        const c2eContainer = new C2eContainerLd(this.getResourceCollection(), this.getc2eContentTypeCollection(), this.getReaderSourceCode(), this.getC2eContents());
        return c2eContainer;
    }

    getResourceCollection(): C2eResourceCollectionLd {
        return this.c2eResourceCollectionLd;
    }

    getc2eContentTypeCollection(): C2eContentTypeCollectionLd {
        return this.c2eContentTypeCollectionLd;
    }

    getMetadata(): C2eMetadataLd {
        return this.c2eMetadata;
    }

    getC2eContents(): C2eDigitalDocument {
        return this.c2eContents;
    }

    getC2e(): C2eLd {
        return this.c2e;
    }
}