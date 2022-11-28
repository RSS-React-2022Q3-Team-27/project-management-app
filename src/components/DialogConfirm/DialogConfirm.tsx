import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Context } from '../../Context/Context';
import { ReducerTypes } from '../../Context/contextReducer/ReducerTypes';

export const DialogConfirm = () => {
  const { contextState, contextDispatch } = useContext(Context);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const onClose = () => {
    contextDispatch({ type: ReducerTypes.null });
  };

  const onClick = async () => {
    if (contextState.cb) {
      setIsLoading(true);

      try {
        await contextState.cb();
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }

      contextDispatch({ type: ReducerTypes.null });
    }
  };

  return (
    <>
      <Modal
        aria-labelledby="alert-dialog-modal-title"
        aria-describedby="alert-dialog-modal-description"
        open={typeof contextState.cb === 'function'}
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
            <Button variant="solid" color="danger" onClick={onClick} loading={isLoading}>
              {t('confirmSure')}
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </>
  );
};
