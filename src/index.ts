import C2eWriter from "./writer/C2eWriter";
import { STRING_TYPE } from "./constants";

const c2eId = '12345';
const c2eWriter = new C2eWriter(c2eId);

// ==== Define C2E Resources ====
c2eWriter.createC2eResource('src/resources/thumbnail.jpg', 'thumbnail.jpg', 'image/jpeg');
c2eWriter.createC2eResource('src/resources/profile.jpg', 'profile.jpg', 'image/jpeg');


// Make C2e content types
c2eWriter.defineC2eContentType('Project', [
    {property: "title", type: STRING_TYPE}, 
    {property: "description", type: STRING_TYPE}, 
]);

c2eWriter.defineC2eContentType('Playlist', [
    {property: "title", type: STRING_TYPE}, 
    {property: "description", type: STRING_TYPE}, 
]);

c2eWriter.defineC2eContentType('Activity', [
    {property: "title", type: STRING_TYPE},
    {property: "description", type: STRING_TYPE},
    {property: "h5pUrl", type: STRING_TYPE},
]);

c2eWriter.createC2eContent('Project', {title: 'My Project', description: 'about my project'});
c2eWriter.createC2eContent('Project', {title: 'My Project 1', description: 'about my project 1'});
// c2eWriter.createC2eContent('Project', {description: 'about my project 2'});

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
console.log("<<< Manifest c2e.json >>>");
console.log(JSON.stringify(c2eWriter.getC2e().toJsonLd(), null, '\t'));
console.log("<<< contents.json >>>");
console.log(JSON.stringify(c2eWriter.getC2eContents().toJsonLd(), null, '\t'));
