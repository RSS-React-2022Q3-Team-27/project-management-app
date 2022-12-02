import { Box, Button, CircularProgress, Divider, Sheet, Typography } from '@mui/joy';
import Avatar from '@mui/joy/Avatar';
import React, { useState, useContext, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Counter } from './Counter/Counter';

import { DialogEditProfile } from './DialogEditProfile/DialogEditProfile';
import styles from './UserInfo.module.css';
import { UserInfoFields } from './UserInfoFields/UserInfoFields';

import { ROUTES } from '../../../constants/routes';
import { URL } from '../../../constants/URL';
import { Context } from '../../../Context/Context';
import { ReducerTypes } from '../../../Context/contextReducer/ReducerTypes';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useDeleteFileMutation, useUploadFileMutation } from '../../../store/slices/files/filesApi';
import { setAvatar, setAvatarInfo, toggleAvatarModal, userLogOut } from '../../../store/slices/user/userSlice';
import { useDeleteUserMutation } from '../../../store/slices/users/usersApi';
import { getFormData } from '../../../utils/getFormData';
import { AvatarModal } from '../../SignUpForm/Avatar/AvatarModal';

export const UserInfo = () => {
  const navigate = useNavigate();
  const { contextDispatch } = useContext(Context);
  const dispatch = useAppDispatch();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { login, id, avatar, avatarInfo } = useAppSelector((state) => state.user);
  const { t } = useTranslation();
  const [deleteUser] = useDeleteUserMutation();
  const [delFile] = useDeleteFileMutation();
  const [uploadFile, { isLoading }] = useUploadFileMutation();
  const [file, setFile] = useState<null | File>(null);
  const prevFile = useRef<null | File>(null);

  const delUser = async () => {
    await deleteUser(id)
      .unwrap()
      .then(async () => {
        navigate(ROUTES.WELCOME.path);
        setTimeout(() => dispatch(userLogOut()), 0);
      })
      .catch(() => toast.error(t('serverError')));
    if (avatarInfo) {
      await delFile(avatarInfo._id).catch(() => {});
    }
  };

  const changeAvatar = useCallback(() => {
    if (avatarInfo) {
      delFile(avatarInfo._id).catch(() => {});
    }

    uploadFile(getFormData(login, file!, avatarInfo))
      .unwrap()
      .then((data) => {
        dispatch(setAvatarInfo(data));
        dispatch(setAvatar(`${URL}${data.path}`));
      })
      .catch(() => toast.error(t('serverError')));
  }, [avatarInfo, delFile, dispatch, file, login, t, uploadFile]);

  useEffect(() => {
    if (file && file !== prevFile.current) {
      prevFile.current = file;
      changeAvatar();
    }
  }, [changeAvatar, file]);

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
        boxShadow: 'sm',
      }}
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
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'relative',
            }}
          >
            <Avatar
              className={styles.avatar}
              alt={login}
              src={avatar}
              sx={{
                height: '160px',
                width: '160px',
                cursor: 'pointer',
                pointerEvents: isLoading ? 'none' : 'inherit',
              }}
              onClick={() => dispatch(toggleAvatarModal(true))}
            />
            {isLoading && (
              <CircularProgress
                sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
              />
            )}
          </Box>
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
      <AvatarModal setFile={setFile} />
    </Sheet>
  );
};
