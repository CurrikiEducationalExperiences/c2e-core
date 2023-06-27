import C2eWriter from './writer/C2eWriter';
import { INTEGER_TYPE, STRING_TYPE } from './constants';

const c2eId = '17175';
const c2eWriter = new C2eWriter(c2eId);

// Make C2e content types
// Define Project
c2eWriter.defineC2eContentType('Project', [
  { property: 'id', type: INTEGER_TYPE },
  { property: 'title', type: STRING_TYPE },
  { property: 'description', type: STRING_TYPE },
]);

// Define Playlist
c2eWriter.defineC2eContentType('Playlist', [
  { property: 'title', type: STRING_TYPE },
  { property: 'description', type: STRING_TYPE },
  { property: 'playlistId', type: STRING_TYPE },
]);

// Define Activity
c2eWriter.defineC2eContentType('Activity', [
  { property: 'title', type: STRING_TYPE },
  { property: 'description', type: STRING_TYPE },
  { property: 'h5pSettingsJson', type: STRING_TYPE },
  { property: 'h5pContent', type: STRING_TYPE },
  { property: 'playlistId', type: STRING_TYPE },
]);

// extraxt zip files for all paths

const all_paths: any = c2eWriter.c2eExtractZip(
  '/media/fahadfarrukh/Data Drive/vTeams/Curriki/C2E/Sample/Fahad/Zips/projects-6499b15ac7a6c.zip'
);
console.log(all_paths)
//console.log('>>>>>>***** ', all_paths.allResources);

// ==== Define C2E Resources ====
// if (all_paths.allResources) {
//   all_paths.allResources.forEach((element: any) => {
//     let sourceRoot: any = '/media/fahadfarrukh/Data Drive/vTeams/Curriki/C2E/Sample/Fahad/Zips/projects-6499b15ac7a6c';
//     let sourceRs: any = `${element.replaceAll(
//       '/',
//       '\\'
//     )}`;
//     sourceRs = sourceRoot + sourceRs.replaceAll(':', '_').replaceAll('?', '_').replaceAll('\'', '_').replaceAll('"', '_');
//     c2eWriter.createC2eResource(
//       sourceRs,
//       element.replace(/^.*[\\\/]/, ''),
//       'image/png'
//     );
//   });
// }

// check project exist
if (all_paths.projectMetaData) {
  const project_2 = c2eWriter.createC2eContent('Project', {
    id: all_paths.projectMetaData.id,
    title: all_paths.projectMetaData.name,
    description: all_paths.projectMetaData.description,
  });
  // check playlists exist
  if (all_paths.projectMetaData.playlists.length) {
    all_paths.projectMetaData.playlists?.forEach((playlist: any) => {
      const playlist_2 = c2eWriter.createC2eContent('Playlist', {
        title: playlist.title,
        description: playlist.description,
        playlistId: playlist.id
      });

      // check activities exist
      if (playlist.activities.length) {
        playlist.activities.forEach((activity: any) => {

          const activity_2 = c2eWriter.createC2eContent('Activity', {
            title: activity.title,
            description: activity.description,
            h5pSettingsJson: all_paths.h5pSettings?.filter((h5p:any)=>h5p.h5pName===activity.h5p_content.id+"-h5p.json")?.[0],
            h5pContent: activity.h5p_content,
            playlistId: playlist.id
          });
          activity_2?.isPartOf(playlist_2?.getIdentifier()!);
        });
      }
      playlist_2?.isPartOf(project_2?.getIdentifier()!);
    });
  }
}

// Make C2e Metadata
c2eWriter.createC2eMetadata({
  version: 'v1.0',
  general: {
    title: 'Area and Surface Area',
    description: 'Variety of activities of Area and Surface Area.',
    keywords: ['Education', 'Curriculum', 'Curriki', 'Project'],
  },
  author: {
    name: "Caroline Benoist",
    email: "caroline@curriki.org",
    url: "https://c2e.curriki.org"
  },
  publisher: {
    name: "Curriki Reference Implementation",
    email: "info@curriki.org",
    url: "https://www.currikistudio.org"
  },
  license: {
    file: 'license.txt',
    type: 'text/plain',
  },
  copyrightHolder: {
    name: "Caroline Benoist",
    email: "caroline@curriki.org",
    url: "https://curriki.org",
  },
  copyrightNote: 'This C2E has all rights to Mr Bob',
  copyrightYear: '2023',
  codeVersion: 'v1.0',
  codeStatus: 'Beta',
});

// ==== Create C2E ====
if (!c2eWriter.createC2e('/media/fahadfarrukh/Data Drive/vTeams/Curriki/C2E/Sample/Fahad/Zips/c2e-output')) {
  c2eWriter.getErrors().forEach((error: string) => {
    console.log(error);
  });
}

console.log('C2E Writer Exectuted Successfully!');
