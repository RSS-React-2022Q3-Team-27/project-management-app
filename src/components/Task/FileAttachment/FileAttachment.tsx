import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { ModalDialog } from '@mui/joy';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Modal from '@mui/joy/Modal';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { useContext, useState } from 'react';

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
  const [deleteFile] = useDeleteFileMutation();
  const [openImage, setOpenImage] = useState(false);
  const { contextDispatch } = useContext(Context);

  const handleDeleteFile = async () => {
    await deleteFile(fileId).unwrap();
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
        variant="soft"
        color="primary"
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
        <Typography startDecorator={<InsertDriveFileOutlinedIcon color="primary" />}>{name}</Typography>
        <IconButton size="sm" onClick={handleDeleteClick}>
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
