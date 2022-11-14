import { Box, Button, Modal, ModalClose, ModalDialog, Sheet, Typography } from '@mui/joy';
import Avatar from '@mui/joy/Avatar';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import img from '../../assets/images/avatar.jpg';

import { Counter } from '../../components/Profile/Counter/Counter';
import { useAppSelector } from '../../store/hooks';

export const Profile = () => {
  const [open, setOpen] = useState(false);
  const { login, userName } = useAppSelector((state) => state.user);
  const { t } = useTranslation();
  return (
    <Sheet
      sx={{
        height: '100%',
        mx: 'auto',
        py: 3,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 2,
      }}
      variant="soft"
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'center' }}>
        <Typography level="h2">{t('profile')}</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Avatar
            alt={login}
            src={img}
            // size="lg"
            sx={{
              height: '200px',
              width: '200px',
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography level="h6">{login}</Typography>
          <Typography level="h6">{userName}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'space-between', width: '100%' }}>
            <Button variant="solid" sx={{ width: 'max-contant' }} onClick={() => setOpen(true)}>
              {t('editProfile')}
            </Button>
            <Button variant="solid" sx={{ width: 'max-contant' }} onClick={() => setOpen(true)}>
              {t('editProfile')}
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          justifyContent: 'center',
          alignItems: 'center',
          height: '50%',
        }}
      >
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog>
            <ModalClose />
            <Typography>Modal title</Typography>
          </ModalDialog>
        </Modal>
      </Box>
      <Counter />
    </Sheet>
  );
};
