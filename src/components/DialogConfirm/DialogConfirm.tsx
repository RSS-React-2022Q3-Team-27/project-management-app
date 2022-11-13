import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setConfirmOpened } from '../../store/slices/app/appSlice';

type ConfirmPropsType = {
  onConfirm: () => void;
};

export const DialogConfirm: FC<ConfirmPropsType> = (props) => {
  const { confirmOpened } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onClose = () => {
    dispatch(setConfirmOpened(false));
  };
  const onClick = () => {
    props.onConfirm();
    dispatch(setConfirmOpened(false));
  };

  return (
    <>
      <Modal
        aria-labelledby="alert-dialog-modal-title"
        aria-describedby="alert-dialog-modal-description"
        open={confirmOpened}
        onClose={onClose}
      >
        <ModalDialog variant="outlined" role="alertdialog">
          <Typography
            id="alert-dialog-modal-title"
            component="h2"
            level="inherit"
            fontSize="1.25em"
            mb="0.25em"
            startDecorator={<WarningRoundedIcon />}
          >
            {t('confirmation')}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography id="alert-dialog-modal-description" textColor="text.tertiary" mb={3}>
            {t('confirmationText')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            <Button variant="plain" color="neutral" onClick={onClose}>
              {t('confirmCancel')}
            </Button>
            <Button variant="solid" color="danger" onClick={onClick}>
              {t('confirmSure')}
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </>
  );
};
