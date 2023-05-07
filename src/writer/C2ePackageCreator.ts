// creat class "C2ePackageCreator" to which create directory with c2e identifier and create c2e.json file

import fs from 'node:fs';
import path from 'path';
import C2eDigitalDocument from '../interfaces/C2eDigitalDocument';
import C2eContentDocumentLd from '../classes/C2eContentDocumentLd';
import C2eContentDocumentCollectionLd from '../classes/C2eContentDocumentCollectionLd';
import C2eContentLd from '../classes/C2eContentLd';

class C2ePackageCreator {
    private c2dId: string;
    private c2eDirectory: string;
    private c2eJsonLdFile: string;
    private c2eJsonLd: any;
    private c2eJsonLdString: string;
    private c2eJsonLdPath: string;
    private c2eJsonLdFileCreated: boolean;
    private c2eDirectoryCreated: boolean;

    constructor(c2dId: string, c2ePath: string = '') {
        this.c2dId = c2dId;
        if (c2ePath === '') {
            this.c2eDirectory = path.join(__dirname, '..', '..', 'c2eid-' + c2dId);
        } else {
            this.c2eDirectory = path.join(c2ePath, 'c2eid-' + c2dId);
        }
        
        this.c2eJsonLdFile = path.join(this.c2eDirectory, 'c2e.json');
        this.c2eJsonLd = {};
        this.c2eJsonLdString = '';
        this.c2eJsonLdPath = '';
        this.c2eJsonLdFileCreated = false;
        this.c2eDirectoryCreated = false;
        this.createC2eDirectory();
    }

    public createC2eDirectory(): boolean {
        if(!fs.existsSync(this.c2eDirectory)) {
            fs.mkdirSync(this.c2eDirectory);
            fs.mkdirSync(this.c2eDirectory + '/resources');
            fs.mkdirSync(this.c2eDirectory + '/content');
            this.c2eDirectoryCreated = true;
            return true;
        } else {
            fs.rmSync(this.c2eDirectory, {recursive: true});
            this.c2eDirectoryCreated = false;
            this.createC2eDirectory();
            return false;
        }
    }

    public createC2ePackage(c2eJsonLd: any, resourcesToCopy: Array<{sourceFilePath: string, c2eResource: C2eDigitalDocument}>, c2eContents: C2eContentDocumentCollectionLd, c2eContentsToCreate: Array<{c2eContent: Record<string, any> , c2eContentDocument: C2eContentDocumentLd | undefined}> = []): boolean {
        if(this.c2eDirectoryCreated) {
            this.c2eJsonLd = c2eJsonLd;
            this.c2eJsonLdString = JSON.stringify(this.c2eJsonLd, null, 4);
            const c2eContentsLdString = JSON.stringify(c2eContents.toJsonLd(), null, 4);
            fs.writeFileSync(this.c2eJsonLdFile, this.c2eJsonLdString);
            this.processC2eResourcesToCreate(resourcesToCopy);
            this.processC2eContentsToCreate(c2eContentsToCreate);
            fs.writeFileSync(path.join(this.c2eDirectory, '/content/contents.json'), c2eContentsLdString);
            this.c2eJsonLdFileCreated = true;
            return true;
        } else {
            this.c2eJsonLdFileCreated = false;
            return false;
        }
    }

    processC2eResourcesToCreate(resourcesToCopy: Array<{sourceFilePath: string, c2eResource: C2eDigitalDocument}>) {
        resourcesToCopy.forEach((resourceToCopy) => {
            const sourceFilePath = resourceToCopy.sourceFilePath;
            const c2eResource = resourceToCopy.c2eResource;
            const c2eResourcePath = path.join(this.c2eDirectory, c2eResource.getUrl());
            fs.copyFileSync(sourceFilePath, c2eResourcePath);
        } );
    }

    processC2eContentsToCreate(c2eContentsToCreate: Array<{c2eContent: Record<string, any> , c2eContentDocument: C2eContentDocumentLd | undefined}> = []) {
        c2eContentsToCreate.forEach((c2eContentToCreate) => {
            const c2eContent = c2eContentToCreate.c2eContent;
            const c2eContentDocument = c2eContentToCreate.c2eContentDocument;
            if (c2eContentDocument) {
                const c2eContentLd = new C2eContentLd(c2eContent, c2eContentDocument);
                fs.writeFileSync( path.join(this.c2eDirectory, c2eContentDocument.getUrl()), JSON.stringify(c2eContentLd.toJsonLd(), null, 4) );
                this.createPackageFile();
            }
        });
    }

    createPackageFile() {
        // create c2e package file useing this.c2eDirectory
    }
}

export default C2ePackageCreator;