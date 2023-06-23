import C2eWriter from './writer/C2eWriter';
import { INTEGER_TYPE, STRING_TYPE } from './constants';

const c2eId = 'mikedemo';
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
  'F:\\curriki studio\\c2e\\sample2\\project.zip'
);
console.log(all_paths)
// ==== Define C2E Resources ====
if (all_paths.allResources) {
  all_paths.allResources.forEach((element: any) => {
    c2eWriter.createC2eResource(
      `F:\\curriki studio\\c2e\\c2e-core\\outputfolder\\${element.replaceAll(
        '/',
        '\\'
      )}`,
      element.replace(/^.*[\\\/]/, ''),
      'image/png'
    );
  });
}

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
    title: 'My Project C2E',
    description: 'This is CurrikiStudio Project as a C2e',
    keywords: ['Education', 'Curriculum', 'Curriki', 'Project'],
  },
  author: {
    name: 'Waqar Muneer',
    email: 'waqar@curriki.org',
    url: 'https://github.com/i-do-dev',
  },
  publisher: {
    name: 'Curriki Publisher',
    email: 'publisher@curriki.org',
    url: 'https://curriki.org/publisher',
  },
  license: {
    file: 'license.txt',
    type: 'text/plain',
  },
  copyrightHolder: {
    name: 'Waqar Muneer',
    email: 'waqar@curriki.org',
    url: 'https://github.com/i-do-dev',
  },
  copyrightNote: 'This C2E has all rights to Waqar Muneer',
  copyrightYear: '2023',
  codeVersion: 'v1.0',
  codeStatus: 'Beta',
});

// ==== Create C2E ====
if (!c2eWriter.createC2e('F:\\curriki studio\\c2e\\c2e-output\\')) {
  c2eWriter.getErrors().forEach((error: string) => {
    console.log(error);
  });
}

console.log('C2E Writer Exectuted Successfully!');
