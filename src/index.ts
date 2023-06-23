import C2eWriter from "./writer/C2eWriter";
import { INTEGER_TYPE, STRING_TYPE } from "./constants";

const c2eId = '12345';
const c2eWriter = new C2eWriter(c2eId);

// Make C2e content types
// Define Project
c2eWriter.defineC2eContentType('Project', [
    {property: "id", type: INTEGER_TYPE},
    {property: "title", type: STRING_TYPE},
    {property: "description", type: STRING_TYPE},
]);

// Define Playlist
c2eWriter.defineC2eContentType('Playlist', [
    {property: "title", type: STRING_TYPE},
    {property: "description", type: STRING_TYPE},
]);

// Define Activity
c2eWriter.defineC2eContentType('Activity', [
    {property: "title", type: STRING_TYPE},
    {property: "description", type: STRING_TYPE},
    {property: "h5pSettingsJson", type: STRING_TYPE},
]);

// ==== Define C2E Resources ====
c2eWriter.createC2eResource('F:\\curriki studio\\c2e\\c2e-output\\resources\\pic.jpg', 'pic1.jpg', 'image/jpeg');
c2eWriter.createC2eResource('F:\\curriki studio\\c2e\\c2e-output\\resources\\pic2.jpg', 'pic2.jpg', 'image/jpeg');

// Make C2e contents and relations according to the defined content types
// Make Project 1
const project_1 = c2eWriter.createC2eContent('Project', {id: '1', title: 'My Project', description: 'about my project'});
const playlist_1 = c2eWriter.createC2eContent('Playlist', {title: 'My Playlist', description: 'about my playlist'});
playlist_1?.isPartOf(project_1?.getIdentifier()!);

// Make Project 2
const project_2 = c2eWriter.createC2eContent('Project', {id: '2', title: 'My Project', description: 'about my project 2'});
const playlist_2 = c2eWriter.createC2eContent('Playlist', {title: 'My Playlist', description: 'about my playlist 2'});
const h5pSettingsJson = JSON.stringify({settingId: 101, settingName: 'H5P Activity'});
const activity_2 = c2eWriter.createC2eContent('Activity' , {title: 'My Activity', description: 'about my activity', h5pSettingsJson});
activity_2?.isPartOf(playlist_2?.getIdentifier()!);
playlist_2?.isPartOf(project_2?.getIdentifier()!);


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
if(!c2eWriter.createC2e('F:\\curriki studio\\\c2e\\\c2e-output1\\')) {
    c2eWriter.getErrors().forEach((error: string) => {
        console.log(error);
    });
}

console.log("C2E Writer Exectuted Successfully!");