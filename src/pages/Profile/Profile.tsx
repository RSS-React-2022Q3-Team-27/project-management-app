import AccessibilityNewRoundedIcon from '@mui/icons-material/AccessibilityNewRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { Box, Button, Chip, Divider, Sheet, Typography } from '@mui/joy';
import Avatar from '@mui/joy/Avatar';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import img from '../../assets/images/avatar.jpg';
import { DialogConfirm } from '../../components/DialogConfirm/DialogConfirm';

import { Counter } from '../../components/Profile/Counter/Counter';
import { DialogEditProfile } from '../../components/Profile/DialogEditProfile/DialogEditProfile';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setConfirmOpened } from '../../store/slices/app/appSlice';
import { userLogOut } from '../../store/slices/user/userSlice';
import { useDeleteUserMutation } from '../../store/slices/users/usersApi';

export const Profile = () => {
  const dispatch = useAppDispatch();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { login, userName, id } = useAppSelector((state) => state.user);
  const { t } = useTranslation();
  const [deleteUser] = useDeleteUserMutation();
  const delUser = async () => {
    console.log('delete', id);
    await deleteUser(id).unwrap();
    dispatch(userLogOut());
  };
  return (
    <Sheet
      sx={{
        maxWidth: 600,
        mx: 'auto',
        my: 4,
        py: 3,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRadius: 'sm',
        boxShadow: 'md',
      }}
      variant="outlined"
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'center' }}>
        <Typography level="h2">{t('profile')}</Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 4,
          justifyContent: 'space-between',
          alignItems: { xs: 'center', sm: '' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            justifyContent: { xs: 'center', sm: 'flex-start' },
            alignItems: 'center',
            width: '100%',
            flex: 1,
          }}
        >
          <Avatar
            alt={login}
            src={img}
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
            gap: 3,
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '100%',
            flex: 2,
            maxWidth: { xs: 280, sm: '100%' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              justifyContent: 'space-between',
              paddingTop: '30px',
              width: '100%',
              justifySelf: 'center',
              height: '100%',
            }}
          >
            <Chip variant="outlined" color="neutral" size="lg" startDecorator={<PersonRoundedIcon />}>
              <Typography
                level="h6"
                sx={{
                  width: '70px',
                }}
              >
                {t('login')}:
              </Typography>
              {login}
            </Chip>
            <Chip variant="outlined" color="neutral" size="lg" startDecorator={<AccessibilityNewRoundedIcon />}>
              <Typography
                level="h6"
                sx={{
                  width: '70px',
                }}
              >
                {t('name')}:
              </Typography>
              {userName}
            </Chip>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'space-between', width: '100%' }}>
            <Button
              variant="solid"
              color="danger"
              sx={{ width: 'max-contant' }}
              onClick={() => dispatch(setConfirmOpened(true))}
            >
              {t('deleteUser')}
            </Button>
            <Button variant="solid" sx={{ width: 'max-contant' }} onClick={() => setIsEditOpen(true)}>
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
        <Counter />
      </Box>
      <DialogConfirm onConfirm={delUser} />
      <DialogEditProfile openDialog={setIsEditOpen} isDialogOpen={isEditOpen} />
    </Sheet>
  );
};
