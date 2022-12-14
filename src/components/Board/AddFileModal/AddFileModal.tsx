import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import ReportGmailerrorredRoundedIcon from '@mui/icons-material/ReportGmailerrorredRounded';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import { ChangeEvent, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import styles from './FileInput.module.css';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useDeleteFileMutation, useUploadFileMutation } from '../../../store/slices/files/filesApi';
import { closeAddFileModal } from '../../../store/slices/files/filesSlice';
import { getNewFileName } from '../../../utils/getNewFileName';

export const AddFileModal = () => {
  const { t } = useTranslation();
  const fileInput = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { isAddFileModalOpened, fileData } = useAppSelector((state) => state.files);
  const [uploadFile, { isLoading }] = useUploadFileMutation();
  const [deleteFile] = useDeleteFileMutation();
  const [fileForUpload, setFileToUpload] = useState<File | null>(null);
  const [isFormatWrong, setIsFormatWrong] = useState(false);

  const handleClose = () => {
    dispatch(closeAddFileModal());
    setFileToUpload(null);
    setIsFormatWrong(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0].type) {
      if (event.target.files[0].type === 'image/jpeg' || event.target.files[0].type === 'image/png') {
        setIsFormatWrong(false);
        setFileToUpload(event.target.files[0]);
      } else {
        setIsFormatWrong(true);
        setFileToUpload(null);
      }
    }
  };

  const handleUpload = async () => {
    if (fileData.cover && fileData.isCover) {
      await deleteFile(fileData.coverId)
        .unwrap()
        .catch(() => toast.error(t('serverError')));
    }

    if (fileForUpload) {
      const formData = new FormData();
      const newName = getNewFileName(fileForUpload.name, fileData.cover, fileData.files);

      formData.append('boardId', fileData.boardId);
      formData.append('taskId', fileData.taskId);
      formData.append('file', fileForUpload, newName);

      await uploadFile(formData)
        .unwrap()
        .catch(() => toast.error(t('serverError')));
    }

    handleClose();
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
          border: 'none',
        }}
      >
        <ModalClose />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
            border: '2px dashed var(--joy-palette-primary-300)',
            borderRadius: 8,
            position: 'relative',
            p: 1,
            mb: 2,
            mt: 3,
          }}
        >
          <input
            className={styles.input}
            ref={fileInput}
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleChange}
            disabled={isLoading}
            style={{ zIndex: 2000 }}
          />
          <BackupRoundedIcon sx={{ fontSize: 40, color: 'var(--joy-palette-primary-300)' }} />
          <Typography sx={{ textAlign: 'center' }}>{t('dragDrop')}</Typography>
          <Typography>{t('or')}</Typography>
          <Button color="neutral" variant="soft">
            {t('chooseFile')}
          </Button>
        </Box>
        <Typography color="primary" sx={{ fontSize: 14, textAlign: 'center', mt: 1, mb: 2 }}>
          {t('fileExtension')}
        </Typography>
        {fileForUpload && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 0.5 }}>
            <InsertDriveFileRoundedIcon color="primary" />
            <Typography
              sx={{
                maxWidth: 216,
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                display: 'block',
              }}
            >
              {fileForUpload.name}
            </Typography>
          </Box>
        )}
        {isFormatWrong && (
          <Typography color="danger" sx={{ mb: 2 }} startDecorator={<ReportGmailerrorredRoundedIcon />}>
            {t('wrongFileType')}
          </Typography>
        )}
        <Button loading={isLoading} sx={{ width: '100%' }} disabled={!fileForUpload} onClick={handleUpload}>
          {t('upload')}
        </Button>
      </ModalDialog>
    </Modal>
  );
};
