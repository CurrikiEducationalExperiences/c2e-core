// @ts-ignore
import  AdmZip from "adm-zip";
import fs from "fs";
import path from "path";
// @ts-ignore
//import sample from "./sample.js";
const sample = {
    "@context": {
      c2ens: "https://c2e.curriki.org/",
      sdons: "https://schema.org/",
      xsd: "http://www.w3.org/2001/XMLSchema/#",
      C2E: "sdons:CreativeWork",
      c2eType: { "@id": "sdons:additionalType", "@type": "xsd:string" },
      c2eContain: { "@id": "sdons:Collection", "@container": ["@graph", "@index"] },
      c2eResources: "@graph",
      c2eComponents: "@graph",
      c2eTerm: "c2ens:terms/",
      c2eVendor: { "@id": "sdons:vendor", "@type": "xsd:string" },
      name: { "@id": "sdons:name", "@type": "xsd:string" },
      url: { "@id": "sdons:url", "@type": "xsd:string" },
      fileFormat: { "@id": "sdons:fileFormat", "@type": "xsd:string" },
      "@language": "en",
      metadata: "c2eTerm:metadata",
      schemaVersion: { "@id": "sdons:schemaVersion", "@type": "xsd:string" },
      general: "c2eTerm:mdGeneral",
      title: { "@id": "sdons:headline", "@type": "xsd:string" },
      description: { "@id": "sdons:description", "@type": "xsd:string" },
      keywords: { "@id": "sdons:keywords", "@type": "xsd:string" },
      author: { "@id": "sdons:author", "@type": "xsd:string" },
      publisher: { "@id": "sdons:publisher", "@type": "xsd:string" },
      email: { "@id": "sdons:email", "@type": "xsd:string" },
      lifecycle: "c2eTerm:mdLifecycle",
      version: { "@id": "sdons:version", "@type": "xsd:string" },
      releaseStatus: { "@id": "sdons:creativeWorkStatus", "@type": "xsd:string" },
      subManifest: { "@id": "sdons:url", "@type": "xsd:string" },
      copyRights: "c2eTerm:copyRights",
      license: { "@id": "sdons:license", "@type": "xsd:string" },
      encodingFormat: { "@id": "sdons:encodingFormat", "@type": "xsd:string" },
      copyrightHolder: { "@id": "sdons:copyrightHolder", "@type": "xsd:string" },
      copyrightNotice: { "@id": "sdons:copyrightNotice", "@type": "xsd:string" },
      copyrightYear: { "@id": "sdons:copyrightYear", "@type": "xsd:integer" },
    },
    metadata: {
      "@id": "c2ens:c2eid-xxx/metadata",
      "@type": "sdons:Dataset",
      schemaVersion: "1.0",
      general: {
        "@id": "c2ens:c2eid-xxx/metadata/general",
        "@type": "sdons:Dataset",
        title: "My Smaple C2E",
        description: "My Smaple C2E for Proof of Concept.",
        keywords: "c2e, e-learning, learning experince",
      },
      author: {
        "@id": "c2ens:c2eid-xxx/author/id/xxx",
        "@type": "sdons:Person",
        name: "Waqar Muneer",
        email: "waqar@curriki.org",
        url: "https://twitter.com/waqarmnr",
      },
      publisher: {
        "@id": "c2ens:c2eid-xxx/author/id/xxx",
        "@type": "sdons:Organization",
        name: "Curriki",
        email: "info@curriki.org",
        url: "https://curriki.org",
      },
      lifecycle: {
        "@id": "c2ens:c2eid-xxx/metadata/lifecycle",
        "@type": "sdons:Code",
        version: "1.10",
        releaseStatus: "Beta",
      },
      copyRights: {
        "@id": "c2ens:c2eid-xxx/metadata/copyRights",
        "@type": "sdons:Dataset",
        license: {
          "@id": "c2ens:c2eid-xxx/license/id/xxx",
          "@type": "sdons:DigitalDocument",
          encodingFormat: "application/text or any binary as per need",
          url: "/path/to/license.txt",
        },
        copyrightHolder: {
          "@id": "c2ens:c2eid-xxx/copyrightHolder/id/xxx",
          "@type": "sdons:Person",
          name: "Waqar Muneer",
          email: "waqar@curriki.org",
          url: "https://twitter.com/waqarmnr",
        },
        copyrightNotice: "This C2E has all rights to Waqar Muneer",
        copyrightYear: "2023",
      },
    },
    "@id": "c2ens:c2eid-xxx",
    "@type": "C2E",
    name: "sample-c2e",
    c2eType: "Activity",
    c2eContain: [
      {
        "@id": "c2eTerm:c2eResources",
        "@type": "sdons:Collection",
        c2eResources: [
          {
            "@id": "c2ens:c2eid-xxx/resource/1",
            "@type": "sdons:DigitalDocument",
            url: "63cfea46927c8.png",
            fileFormat: "image/png",
          },
          {
            "@id": "c2ens:c2eid-xxx/resource/2",
            "@type": "sdons:DigitalDocument",
            url: "project.json",
            fileFormat: "application/json",
          },
        ],
      },
      {
        "@id": "c2eTerm:c2eComponents",
        "@type": "sdons:Collection",
        c2eComponents: [],
      },
    ],
  };
const outputFolder = "example_output";
export const  currikiConverter = (uploadPath: any) => {

    const zipper = new AdmZip(uploadPath);

    // extract zip file
    zipper.extractAllTo(outputFolder, true);

    // Write the c2e file path in each directory
    function writeDirectoryPaths(dir:any, file:any) {
      const directoryPaths:any = [];
      const filePathsh5p:any = [];
      fs.readdirSync(dir).forEach((file:any) => {
        const filePath = path.join(dir, file);

        if (fs.statSync(filePath).isDirectory()) {
          directoryPaths.push(filePath);
          // recursive function
          writeDirectoryPaths(filePath, path.join(filePath, "c2e.json"));
        } else {
          filePathsh5p.push(filePath);
        }
      });
      // write submesnifest path for each c2e json
      var manifestCouple = directoryPaths.map((data:any) => {
        return {
          "@id": "c2ens:c2eid-xxx-2",
          "@type": "C2E",
          "@index": "2",
          name: data.split("/")[data.split("/").length - 1],
          c2eType: "H5P",
          subManifest: data.replace("example_output/", "") + "/c2e.json",
        };
      });
      // write resource path and folder name
      var resourceCouple = filePathsh5p.map((data:any) => {
        return {
          "@id": "c2ens:c2eid-xxx/resource/1",
          "@type": "sdons:DigitalDocument",
          url: data.split("/")[data.split("/").length - 1],
          fileFormat: data.split(".")?.[1],
        };
      });
      resourceCouple = [
        ...resourceCouple,
        ...directoryPaths.map((data:any) => {
          return {
            "@id": "c2ens:c2eid-xxx/resource/1",
            "@type": "sdons:DigitalDocument",
            url: data.split("/")[data.split("/").length - 1],
            fileFormat: data.split(".")?.[1] || "directory",
          };
        }),
      ];
      if (directoryPaths.length > 0) {
        fs.writeFileSync(
          file,
          JSON.stringify({
            ...sample,
            c2eContain: [
              {
                "@id": "c2eTerm:c2eResources",
                "@type": "sdons:Collection",
                c2eResources: resourceCouple,
              },
              {
                "@id": "c2eTerm:c2eComponents",
                "@type": "sdons:Collection",
                c2eComponents: [...manifestCouple],
              },
            ],
          })
        );
      } else {
        console.log("files", file);
        fs.writeFileSync(
          file,
          JSON.stringify({
            ...sample,
            c2eContain: [
              {
                "@id": "c2eTerm:c2eResources",
                "@type": "sdons:Collection",
                c2eResources: resourceCouple,
              },
              {
                "@id": "c2eTerm:c2eComponents",
                "@type": "sdons:Collection",
                c2eComponents: [],
              },
            ],
          })
        );
      }
    }

    writeDirectoryPaths(outputFolder, path.join(outputFolder, "c2e.json"));
    const zip = new AdmZip();
    zip.addLocalFolder(outputFolder, "");
    zip.writeZip('outputZip.c2e');
}

