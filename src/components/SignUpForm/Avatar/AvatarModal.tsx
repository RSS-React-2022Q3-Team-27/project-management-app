import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import ReportGmailerrorredRoundedIcon from '@mui/icons-material/ReportGmailerrorredRounded';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import { ChangeEvent, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './AvatarModal.module.css';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { toggleAvatarModal } from '../../../store/slices/user/userSlice';

interface IProps {
  setFile: (val: File) => void;
}

export const AvatarModal = ({ setFile }: IProps) => {
  const { t } = useTranslation();
  const fileInput = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { isAvatarModal } = useAppSelector((state) => state.user);
  const [isFormatWrong, setIsFormatWrong] = useState(false);

  const handleClose = () => {
    dispatch(toggleAvatarModal(false));
    setIsFormatWrong(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0].type) {
      if (event.target.files[0].type === 'image/jpeg' || event.target.files[0].type === 'image/png') {
        setIsFormatWrong(false);
        setFile(event.target.files[0]);
        handleClose();
      } else {
        setIsFormatWrong(true);
      }
    }
  };

  return (
    <Modal open={isAvatarModal} onClose={handleClose}>
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
            mt: 4,
          }}
        >
          <input
            className={styles.input}
            ref={fileInput}
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleChange}
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
        {isFormatWrong && (
          <Typography color="danger" sx={{ mb: 2 }} startDecorator={<ReportGmailerrorredRoundedIcon />}>
            {t('wrongFileType')}
          </Typography>
        )}
      </ModalDialog>
    </Modal>
  );
};
