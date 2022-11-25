import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import ReportGmailerrorredRoundedIcon from '@mui/icons-material/ReportGmailerrorredRounded';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { ChangeEvent, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import styles from './FileInput.module.css';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useUploadFileMutation } from '../../../store/slices/files/filesApi';
import { closeAddFileModal } from '../../../store/slices/files/filesSlice';

export const AddFileModal = () => {
  const { t } = useTranslation();
  const fileInput = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { isAddFileModalOpened, fileData } = useAppSelector((state) => state.files);
  const [uploadFile, { isError, isLoading }] = useUploadFileMutation();
  const [fileForUpload, setFileToUpload] = useState<File | null>(null);
  const [isFormatWrong, setIsFormatWrong] = useState(false);

  const handleClose = () => {
    dispatch(closeAddFileModal());
    setFileToUpload(null);
    setIsFormatWrong(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      console.log(event.target.files[0]);
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

    handleClose();
  };

  const handleChooseFile = () => {
    if (fileInput?.current) {
      fileInput.current.click();
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
        <IconButton variant="soft" onClick={handleClose} sx={{ position: 'absolute', top: -16, right: -16 }}>
          <CloseRoundedIcon />
        </IconButton>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
            border: '3px dashed var(--joy-palette-primary-200)',
            borderRadius: 8,
            position: 'relative',
            p: 1,
            mb: 2,
          }}
        >
          <input
            className={styles.input}
            ref={fileInput}
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleChange}
            disabled={isLoading}
          />
          <BackupRoundedIcon sx={{ fontSize: 40, color: 'var(--joy-palette-primary-200)' }} />
          <Typography sx={{ textAlign: 'center' }}>{t('dragDrop')}</Typography>
          <Typography>{t('or')}</Typography>
          <Button variant="soft" onClick={handleChooseFile}>
            {t('chooseFile')}
          </Button>
        </Box>
        <Typography color="primary" sx={{ fontSize: 14, textAlign: 'center', mt: 1, mb: 2 }}>
          {t('fileExtension')}
        </Typography>
        {fileForUpload && (
          <Sheet variant="soft" color="primary" sx={{ width: '100%', borderRadius: 8, px: 2, py: 1, mb: 2 }}>
            <Typography color="primary" startDecorator={<InsertDriveFileRoundedIcon />}>
              {fileForUpload.name}
            </Typography>
          </Sheet>
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
