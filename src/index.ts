import C2eLd from "./classes/C2eLd";
import C2eWriter from "./writer/C2eWriter";
import { STRING_TYPE } from "./constants";

const c2eId = 'AAA';
const c2eWriter = new C2eWriter(c2eId);

// ==== Define C2E Resources ====
c2eWriter.createC2eResource('src/resources/thumbnail.jpg', 'thumbnail.jpg', 'image/jpeg');
c2eWriter.createC2eResource('src/resources/profile.jpg', 'profile.jpg', 'image/jpeg');


// Make C2e content types
c2eWriter.createC2eContentType('project', [
    {property: "title", type: STRING_TYPE}, 
    {property: "description", type: STRING_TYPE}, 
]);

c2eWriter.createC2eContentType('playlist', [
    {property: "title", type: STRING_TYPE}, 
    {property: "description", type: STRING_TYPE}, 
]);

c2eWriter.createC2eContentType('activity', [
    {property: "title", type: STRING_TYPE},
    {property: "description", type: STRING_TYPE},
]);

// Make C2e Metadata
c2eWriter.createC2eMetadata({
    version: 'v1.0',
    general: {
        title: 'My Project C2E',
        description: 'This is CurrikiStudio Project as a C2e',
        keywords: ["Education", "Curriculum", "Curriki", "Project"]
    },
    author: {
        name: 'Waqar Muneer', 
        email: 'waqar@curriki.org', 
        url: 'https://github.com/i-do-dev'
    },
    publisher: {
        name: 'Curriki Publisher',
        email: 'publisher@curriki.org',
        url: 'https://curriki.org/publisher'
    },
    license: {
        file: 'license.txt',
        type: 'text/plain'
    },
    copyrightHolder: {
        name: 'Waqar Muneer', 
        email: 'waqar@curriki.org', 
        url: 'https://github.com/i-do-dev'
    },
    copyrightNote: 'This C2E has all rights to Waqar Muneer',
    copyrightYear: '2023',
    codeVersion: 'v1.0',
    codeStatus: 'Beta'
});

// ==== Create C2E ====
c2eWriter.createC2e();

console.log("RUNNING C2E Application");
console.log(JSON.stringify(c2eWriter.getC2e().toJsonLd(), null, '\t'));
