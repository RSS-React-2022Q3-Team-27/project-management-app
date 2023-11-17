import { fileType } from '../components/Board/Columns/Columns';

export const getNewFileName = (fileName: string, cover: string | null, files: fileType[]) => {
  let newName = fileName;
  const fileNames: string[] = cover ? [cover] : [];
  let count = 1;

  files.forEach((file) => {
    fileNames.push(file.name);
  });

  const oldName = fileName.split('.');
  const extension = oldName.pop();

  while (fileNames.includes(newName)) {
    newName = oldName.join('.') + `(${count++}).${extension}`;
  }

  return newName;
};
