import { Box, Button, Divider, Sheet, Typography } from '@mui/joy';
import Avatar from '@mui/joy/Avatar';
import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { toast } from 'react-toastify';

import { Counter } from './Counter/Counter';

import { DialogEditProfile } from './DialogEditProfile/DialogEditProfile';
import { UserInfoFields } from './UserInfoFields/UserInfoFields';

import img from '../../../assets/images/avatar.jpg';
import { Context } from '../../../Context/Context';
import { ReducerTypes } from '../../../Context/contextReducer/ReducerTypes';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { userLogOut } from '../../../store/slices/user/userSlice';
import { useDeleteUserMutation } from '../../../store/slices/users/usersApi';

export const UserInfo = () => {
  const { contextDispatch } = useContext(Context);
  const dispatch = useAppDispatch();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { login, id } = useAppSelector((state) => state.user);
  const { t } = useTranslation();
  const [deleteUser] = useDeleteUserMutation();

  const delUser = async () => {
    deleteUser(id)
      .unwrap()
      .then(() => dispatch(userLogOut()))
      .catch(() => toast.error(t('serverError')));
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
          <UserInfoFields />

          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'space-between', width: '100%' }}>
            <Button
              variant="solid"
              color="danger"
              sx={{ width: 130 }}
              onClick={() => contextDispatch({ type: ReducerTypes.onConfirmAction, payload: delUser })}
            >
              {t('deleteUser')}
            </Button>
            <Button variant="solid" sx={{ width: 130 }} onClick={() => setIsEditOpen(true)}>
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
      <DialogEditProfile openDialog={setIsEditOpen} isDialogOpen={isEditOpen} />
    </Sheet>
  );
};
