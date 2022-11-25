import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useUploadFileMutation } from '../../../store/slices/files/filesApi';
import { closeAddFileModal } from '../../../store/slices/files/filesSlice';

export const AddFileModal = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isAddFileModalOpened, fileData } = useAppSelector((state) => state.files);
  const [uploadFile, { isError }] = useUploadFileMutation();
  const [fileForUpload, setFileToUpload] = useState<File | null>(null);

  const handleClose = () => {
    dispatch(closeAddFileModal());
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      console.log(event.target.files[0]);
      setFileToUpload(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    handleClose();

    if (fileForUpload) {
      const formData = new FormData();

      formData.append('boardId', fileData.boardId);
      formData.append('taskId', fileData.taskId);
      formData.append('file', fileForUpload);

      await uploadFile(formData).unwrap();

      if (isError) {
        toast.error('Error');
      }
    }
  };

  return (
    <Modal open={isAddFileModalOpened} onClose={handleClose}>
      <ModalDialog
        aria-labelledby="add-file-modal-dialog-title"
        sx={{
          maxWidth: 500,
          borderRadius: 'md',
          p: 3,
          boxShadow: 'lg',
        }}
      >
        <input type="file" accept=".jpg,.jpeg,.png" onChange={handleChange} />
        <Button onClick={handleUpload}>Upload</Button>
      </ModalDialog>
    </Modal>
  );
};
