var AdmZip = require('adm-zip');

export const ZipConverter = (filePath: any) => {
  const zipper = new AdmZip(filePath);
  var zipEntries = zipper.getEntries();
  zipper.extractAllTo('outputfolder', true);
  const allResources: any = [];
  const h5pSettings: any = [];
  let projectMetaData: string = '';
  zipEntries.forEach(function (zipEntry: any) {
    // filter all resources
    if (
      zipEntry.entryName?.includes('.png') ||
      zipEntry.entryName?.includes('.jpg') ||
      zipEntry.entryName?.includes('.jpeg') ||
      zipEntry.entryName?.includes('.svg') ||
      zipEntry.entryName?.includes('.mp4')
    ) {
      allResources.push(zipEntry.entryName);
    }
    if (zipEntry.entryName == 'project.json') {
      projectMetaData = zipEntry.getData().toString('utf8');
    }
    if (zipEntry.entryName.includes('-h5p.json')) {
      h5pSettings.push({
        h5p: JSON.parse(zipEntry.getData().toString('utf8')),
        h5pName: zipEntry.name,
      });
    }
  });
  return {
    allResources,
    projectMetaData: JSON.parse(projectMetaData),
    h5pSettings,
  };
};
