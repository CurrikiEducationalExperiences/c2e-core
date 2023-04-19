/* import C2eLd from "./classes/C2eLd";
import C2eContainerLd from "./classes/C2eContainerLd";
import C2eMetadataLd from "./classes/C2eMetadataLd";
import C2eResourceCollectionLd from "./classes/C2eResourceCollectionLd";
import C2eContentTypeCollectionLd from "./classes/C2eContentTypeCollectionLd";
import C2eContentType from "./interfaces/C2eContentType";

const c2eResourceCollectionLd = new C2eResourceCollectionLd('c2e-1-rescourses', 'sdons:Collection', 'C2eDigitalDocument');
const c2eContentTypeCollectionLd = new C2eContentTypeCollectionLd('c2e-1-contenttypes', 'sdons:Collection', 'C2eContentType');

const C2eContainer = new C2eContainerLd(c2eResourceCollectionLd, C2eContentTypeCollectionLd);

const C2eMetadata = new C2eMetadataLd('c2e-1-metadata', 'C2E Meta Data', 'v1.0', {}, {}, {}, {}, {});
C2eMetadata.toJsonLd();

const c2e = new C2eLd('c2e-1', 'C2E', 'My Project C2E', C2eMetadata , C2eContainer);
c2e.toJsonLd();

console.log(c2e);
 */
console.log("RUNNING C2E Application");
