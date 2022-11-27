export const getFormData = (login: string, file: File) => {
  const formData = new FormData();
  formData.append('boardId', login);
  formData.append('taskId', login);
  formData.append('file', file, file.name);
  return formData;
};
