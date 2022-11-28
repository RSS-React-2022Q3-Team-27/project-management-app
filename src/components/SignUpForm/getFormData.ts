import { FileType } from '../../store/slices/files/filesApi';

export const getFormData = (login: string, file: File, prevFileInfo: FileType | null = null) => {
  const formData = new FormData();

  const newName = prevFileInfo && file.name === prevFileInfo.name ? `${file.name}(1)` : file.name;

  formData.append('boardId', login);
  formData.append('taskId', login);
  formData.append('file', file, newName);
  return formData;
};
