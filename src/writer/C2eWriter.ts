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
import C2eContentCatalogLd from "../classes/C2eContentCatalogLd";
import C2eContentDocumentLd from "../classes/C2eContentDocumentLd";
import C2eContentDocumentCollectionLd from "../classes/C2eContentDocumentCollectionLd";
import C2ePackageCreator from "./C2ePackageCreator";

export default class C2eWriter {
    private c2eId: string;
    private c2eResourceCollectionLd: C2eResourceCollectionLd;
    c2eResourcesToCreate: Array<{sourceFilePath: string, c2eResource: C2eDigitalDocument}> = [];
    c2eContentsToCreate: Array<{c2eContent: Record<string, any> , c2eContentDocument: C2eContentDocumentLd | undefined}> = [];
    private c2eContentTypeCollectionLd: C2eContentTypeCollectionLd;
    private c2eMetadata: C2eMetadataLd;
    private c2eContentCatalog: C2eDigitalDocument;
    // private c2eContents: Array<C2eDigitalDocument> = [];
    private c2eContentDocumentCollectionLd: C2eContentDocumentCollectionLd;
    private c2e: C2eLd;
    private ok: Boolean = true;
    private errors: Array<string> = [];

    constructor(c2eId: string) {
        this.c2eId = c2eId;
        this.c2eResourceCollectionLd = new C2eResourceCollectionLd(C2E_RESOURCE_COLLECTION_ID, C2E_COLLECTION_TYPE);
        this.c2eContentTypeCollectionLd = new C2eContentTypeCollectionLd(C2E_CONTENT_TYPE_COLLECTION_ID, C2E_COLLECTION_TYPE);
        this.c2eMetadata = new C2eMetadataLd(this.c2eId, C2E_DATASET_TYPE);
        this.c2e = new C2eLd(this.c2eId, C2E_CREATIVE_WORK_TYPE);
        this.c2eContentCatalog = new C2eContentCatalogLd(this.c2eId);
        this.c2eContentDocumentCollectionLd = new C2eContentDocumentCollectionLd();
    }

    createC2e(c2ePath: string = ''): Boolean {
        this.c2e.setC2eMetadata(this.getMetadata());
        this.c2e.setC2eContainer(this.getContainer());
        if (this.ok) {
            const c2ePackageCreator = new C2ePackageCreator(this.c2eId, c2ePath);
            c2ePackageCreator.createC2ePackage(this.getC2e().toJsonLd(), this.c2eResourcesToCreate, this.getC2eContents(), this.c2eContentsToCreate, this.getC2e());
        }
        return this.ok;
    }

    createC2eResource(sourceFilePath: string, targetFilePath: string, MIMEType: string): void {
        const c2eResource: C2eDigitalDocumentLd = this.c2eResourceCollectionLd.addC2eResource(new C2eDigitalDocumentLd(this.c2eId, C2E_DIGITAL_DOCUMENT_TYPE, targetFilePath, MIMEType));
        this.c2eResourcesToCreate.push({sourceFilePath, c2eResource});
    }

    defineC2eContentType(contentTypeName: string, contentTypeAttributes: Array<{property: string, type: string}>): void {
        if (contentTypeAttributes.length > 0) {
            const contentTypeAttributeList = contentTypeAttributes.map((contentTypeAttribute) => { 
                const attribute = new C2eContentTypeAttributeLd(contentTypeAttribute.property, contentTypeAttribute.type) 
                return attribute;
            });
            const contentType = new C2eContentTypeLd( this.c2eId, contentTypeName, contentTypeAttributeList);
            this.c2eContentTypeCollectionLd.addC2eContentType(contentType);
        }
    }

    createC2eContent(contentTypeName: string, content: Record<string, any>): C2eContentDocumentLd | undefined {
        let c2eContentDocument = undefined;
        const identifier = 'c2ens:c2eid-' + this.c2eId + '/content-type/' + contentTypeName;
        const contentTypeArr = this.c2eContentTypeCollectionLd.getC2eContentTypes()?.filter((c2eContentType) => c2eContentType.getIdentifier() === identifier);
        const contentType = contentTypeArr?.length && contentTypeArr?.length > 0 ? contentTypeArr[0] : null;
        const contentTypeAttributes = contentType?.getAttributes().map(attribute => attribute.getName());

        if (contentType === null) {
            this.ok = false;
            this.errors.push('"' + contentTypeName + '" Content Type not found while creating content!');
        }
        
        if (typeof content === "object" && (contentTypeAttributes ? contentTypeAttributes?.length : 0) > 0 && Object.keys(content).length > 0 && JSON.stringify(Object.keys(content)) === JSON.stringify(contentTypeAttributes)) {
            const firstKey = contentTypeAttributes ? contentTypeAttributes[0] : 0;
            const firstVal = content[firstKey];
            const existingFirstVals = this.c2eContentsToCreate.filter(contentToCreate => contentToCreate.c2eContent[firstKey] === firstVal);
            const fileCounter = existingFirstVals.length > 0 ? '-' + existingFirstVals.length : '';
            const fileName = firstVal.toString().toLowerCase().split(' ').join('-') + fileCounter;
            c2eContentDocument = this.c2eContentDocumentCollectionLd.addC2eContentDocument( new C2eContentDocumentLd(this.c2eId, contentTypeName, fileName + '.json', 'application/json') );
            this.c2eContentsToCreate.push({c2eContent: content, c2eContentDocument});       
        } else {
            this.ok = false;
            this.errors.push('Invalid content type "' + contentTypeName + '" or invalid content "fields". ' + JSON.stringify(content));
        }

        return c2eContentDocument;
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
        const c2eContainer = new C2eContainerLd(this.getResourceCollection(), this.getc2eContentTypeCollection(), this.getReaderSourceCode(), this.getC2eContentCatalog());
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

    getC2eContentCatalog(): C2eDigitalDocument {
        return this.c2eContentCatalog;
    }

    getC2e(): C2eLd {
        return this.c2e;
    }

    getC2eContents(): C2eContentDocumentCollectionLd {
        return this.c2eContentDocumentCollectionLd;
    }

    getErrors(): Array<string> {
        return this.errors;
    }
}