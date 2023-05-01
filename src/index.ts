import C2eLd from "./classes/C2eLd";
import C2eContainerLd from "./classes/C2eContainerLd";
import C2eMetadataLd from "./classes/C2eMetadataLd";
import C2eAuthorLd from "./classes/C2eAuthorLd";
import C2eMdCopyrightLd from "./classes/C2eMdCopyrightLd";
import C2eMdCopyrightHolderLd from "./classes/C2eMdCopyrightHolderLd";
import C2eDigitalDocumentLd from "./classes/C2eDigitalDocumentLd";
import C2eResourceCollectionLd from "./classes/C2eResourceCollectionLd";
import C2eContentTypeCollectionLd from "./classes/C2eContentTypeCollectionLd";
import C2eContentTypeLd from "./classes/C2eContentTypeLd";
import C2eContentTypeAttributeLd from "./classes/C2eContentTypeAttributeLd";
import C2eMdGeneralLd from "./classes/C2eMdGeneralLd";
import C2eSourceCodeLd from "./classes/C2eSourceCodeLd";
import C2ePublisherLd from "./classes/C2ePublisherLd";
import C2eMdLifecycleLd from "./classes/C2eMdLifecycleLd";

// ==== Define C2E Resources ====
const c2eResourceCollectionLd = new C2eResourceCollectionLd('c2ens:c2eResources', 'sdons:Collection');
c2eResourceCollectionLd.addC2eResource(new C2eDigitalDocumentLd('c2ens:c2eid-xxx/resource/rs-1', 'sdons:DigitalDocument', '/path/to/thumbnail.jpg', 'image/jpeg'));
c2eResourceCollectionLd.addC2eResource(new C2eDigitalDocumentLd('c2ens:c2eid-xxx/resource/rs-2', 'sdons:DigitalDocument', '/path/to/profile.jpg', 'image/jpeg'));

// ==== Define C2E Content Types ====
const c2eContentTypeCollectionLd = new C2eContentTypeCollectionLd('c2ens:c2eContentTypes', 'sdons:Collection');
// Define 'Project' Content Type
const c2eProjectTitle = new C2eContentTypeAttributeLd('title', 'xsd:string');
const c2eProjectDescription = new C2eContentTypeAttributeLd('description', 'xsd:string');
const c2eProjectAttributes = [c2eProjectTitle, c2eProjectDescription];
const c2eProjectContentType = new C2eContentTypeLd('c2ens:c2eid-xxx/content-type/project', 'sdons:Dataset', c2eProjectAttributes);
c2eContentTypeCollectionLd.addC2eContentType(c2eProjectContentType);
// Define 'Playlist' Content Type
const c2ePlaylistTitle = new C2eContentTypeAttributeLd('title', 'xsd:string');
const c2ePlaylistDescription = new C2eContentTypeAttributeLd('description', 'xsd:string');
const c2ePlaylistContentType = new C2eContentTypeLd('c2ens:c2eid-xxx/content-type/playlist', 'sdons:Dataset', [c2ePlaylistTitle, c2ePlaylistDescription]);
c2eContentTypeCollectionLd.addC2eContentType(c2ePlaylistContentType);
// Define 'Activity' Content Type
const c2eActivityTitle = new C2eContentTypeAttributeLd('title', 'xsd:string');
const c2eActivityDescription = new C2eContentTypeAttributeLd('description', 'xsd:string');
const c2eActivityContentType = new C2eContentTypeLd('c2ens:c2eid-xxx/content-type/activity', 'sdons:Dataset', [c2eActivityTitle, c2eActivityDescription]);
c2eContentTypeCollectionLd.addC2eContentType(c2eActivityContentType);

// ==== Define C2E Reader Plugin entry point code ====
const htmlDocument = new C2eDigitalDocumentLd('c2eTerm:homepageUrl', 'sdons:SoftwareSourceCode', '/path/to/index.html', 'text/html');
const javascriptDocument = new C2eDigitalDocumentLd('c2eTerm:script', 'sdons:SoftwareSourceCode', '/path/to/index.js', 'application/javascript');
const c2eSourceCode = new C2eSourceCodeLd('c2ens:c2eSourceCode', 'sdons:Collection', htmlDocument, javascriptDocument);

//==== Define C2E Container ====
const C2eContainer = new C2eContainerLd(c2eResourceCollectionLd, c2eContentTypeCollectionLd, c2eSourceCode);

// ==== Define C2E Metadata ====
const c2eMdGeneralLd = new C2eMdGeneralLd('c2ens:c2eid-xxx/metadata/general', 'sdons:Dataset', 'My Project C2E', 'This is CurrikiStudio Project as a C2e', ["Education", "Curriculum", "Curriki", "Project"]);
const c2eAuthorLd = new C2eAuthorLd('c2ens:c2eid-xxx/author/id/xxx', 'sdons:Person', 'Waqar Muneer', 'waqar@curriki.org', 'https://github.com/i-do-dev');
const c2ePublisherLd = new C2ePublisherLd('c2ens:c2eid-xxx/publisher/id/xxx', 'sdons:Orginization', 'Curriki Publisher', 'publisher@curriki.org', 'https://curriki.org/publisher');
const c2eMdCopyrightHolderLd = new C2eMdCopyrightHolderLd('c2ens:c2eid-xxx/copyrightHolder/id/xxx', 'sdons:Person', 'Waqar Muneer', 'waqar@curriki.org', 'https://github.com/i-do-dev');
const c2eLicenseDigitalDocumentLd = new C2eDigitalDocumentLd('c2ens:c2eid-xxx/license/id/xxx', 'sdons:DigitalDocument', '/path/to/license.txt', 'application/text');
const c2eMdCopyrightLd = new C2eMdCopyrightLd('c2ens:c2eid-xxx/metadata/copyright', 'sdons:Dataset', c2eLicenseDigitalDocumentLd, c2eMdCopyrightHolderLd, 'This C2E has all rights to Waqar Muneer', '2023');
const c2eMdLifecycleLd = new C2eMdLifecycleLd('c2ens:c2eid-xxx/metadata/lifecycle', 'sdons:Code', 'v1.0', 'Beta');
const C2eMetadata = new C2eMetadataLd('c2ens:c2eid-xxx/metadata', 'sdons:Dataset', c2eMdGeneralLd, c2eAuthorLd, c2eMdCopyrightLd, 'v1.0', c2ePublisherLd, c2eMdLifecycleLd);


// ==== Create C2E ====
const c2e = new C2eLd('c2ens:c2eid-xxx', 'sdons:CreativeWork', 'my-project-c2e', C2eMetadata , C2eContainer);
// console.log(c2e.toJsonLd());
 
//C2eMetadata.toJsonLd(); // To get JSON-LD for 'Manifest' file


console.log("RUNNING C2E Application");
console.log(JSON.stringify(c2e.toJsonLd(), null, '\t'));
