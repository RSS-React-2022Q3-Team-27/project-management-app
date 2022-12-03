import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { ModalDialog } from '@mui/joy';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Modal from '@mui/joy/Modal';
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
        <Typography startDecorator={<InsertDriveFileOutlinedIcon color="primary" />} sx={{ color: 'text.secondary' }}>
          {name}
        </Typography>
        <IconButton className={styles.icon} variant="plain" color="danger" size="sm" onClick={handleDeleteClick}>
          <CloseRoundedIcon />
        </IconButton>
      </Sheet>

      <Modal
        open={openImage}
        onClose={() => setOpenImage(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <ModalDialog sx={{ maxWidth: '50%' }}>
          <IconButton sx={{ position: 'absolute', right: -16, top: -16 }} onClick={() => setOpenImage(false)}>
            <CloseRoundedIcon />
          </IconButton>
          <Box component="img" sx={{ width: '100%' }} src={`${URL}${path}`} />
        </ModalDialog>
      </Modal>
    </>
  );
};
