// creat class "PackageCreator" to which create directory with c2e identifier and create c2e.json file

import fs from 'node:fs';
import path from 'path';

class PackageCreator {
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
            this.c2eDirectoryCreated = true;
            return true;
        } else {
            fs.unlinkSync(this.c2eDirectory);
            this.c2eDirectoryCreated = false;
            this.createC2eDirectory();
            return false;
        }
    }

    public createc2eJsonLd(c2eJsonLd: any): boolean {
        if(this.c2eDirectoryCreated) {
            this.c2eJsonLd = c2eJsonLd;
            this.c2eJsonLdString = JSON.stringify(this.c2eJsonLd, null, 4);
            const rs = fs.writeFileSync(this.c2eJsonLdFile, this.c2eJsonLdString);
            console.log('>>>>>>>>>>>>>>>>>>>>>>> ', rs);
            
            this.c2eJsonLdFileCreated = true;
            return true;
        } else {
            this.c2eJsonLdFileCreated = false;
            return false;
        }
    }

    public test () {
        return this.c2eJsonLdFile;
    }
}

export default PackageCreator;