import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import styles from './FileAttachment.module.css';

import { URL } from '../../../constants/URL';
import { Context } from '../../../Context/Context';

import { ReducerTypes } from '../../../Context/contextReducer/ReducerTypes';
import { useDeleteFileMutation } from '../../../store/slices/files/filesApi';

type FileAttachmentProps = {
  name: string;
  path: string;
  fileId: string;
};

export const FileAttachment = ({ name, path, fileId }: FileAttachmentProps) => {
  const { t } = useTranslation();
  const [deleteFile] = useDeleteFileMutation();
  const [openImage, setOpenImage] = useState(false);
  const { contextDispatch } = useContext(Context);

  const handleDeleteFile = async () => {
    await deleteFile(fileId)
      .unwrap()
      .catch(() => toast.error(t('serverError')));
  };

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    contextDispatch({
      type: ReducerTypes.onConfirmAction,
      payload: () => handleDeleteFile(),
    });
  };

  return (
    <>
      <Sheet
        className={styles.item}
        variant="outlined"
        color="neutral"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: 8,
          p: 1,
          width: '100%',
          cursor: 'pointer',
        }}
        onClick={() => setOpenImage(true)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <InsertDriveFileOutlinedIcon color="primary" />
          <Typography
            title={name}
            sx={{
              maxWidth: 150,
              color: 'text.secondary',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              display: 'block',
            }}
          >
            {name}
          </Typography>
        </Box>

        <IconButton className={styles.icon} variant="plain" color="danger" size="sm" onClick={handleDeleteClick}>
          <CloseRoundedIcon />
        </IconButton>
      </Sheet>

      <Modal
        open={openImage}
        onClose={() => setOpenImage(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <ModalDialog sx={{ border: 'none' }}>
          <ModalClose />
          <Box
            component="img"
            sx={{ maxHeight: '80vh', maxWidth: '80vw', objectFit: 'fill' }}
            src={`${URL}${path}`}
            alt="Attached image"
          />
        </ModalDialog>
      </Modal>
    </>
  );
};
