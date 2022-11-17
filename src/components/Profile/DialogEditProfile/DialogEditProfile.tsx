import AccessibilityNewRoundedIcon from '@mui/icons-material/AccessibilityNewRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { Box, Divider } from '@mui/joy';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import TextField from '@mui/joy/TextField';
import Typography from '@mui/joy/Typography';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { loginValidate } from './loginValidate';

import { nameValidate } from './nameValidate';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useLogInUserMutation } from '../../../store/slices/user/authApi';
import { setUserInfo } from '../../../store/slices/user/userSlice';
import { useUpdateUserMutation } from '../../../store/slices/users/usersApi';

interface IProps {
  openDialog: (value: boolean) => void;
  isDialogOpen: boolean;
}

export const DialogEditProfile = ({ openDialog, isDialogOpen }: IProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { userName, login, id } = useAppSelector((state) => state.user);
  const [newName, setNewName] = useState(userName);
  const [newLogin, setNewLogin] = useState(login);
  const [password, setPassword] = useState('');
  const [logInUser, { error: logInError }] = useLogInUserMutation();
  const [updateUser, { error: updateError }] = useUpdateUserMutation();

  const onClose = () => {
    openDialog(false);
  };

  const confirmHandler = async () => {
    if (loginValidate(newLogin) && nameValidate(newName)) {
      await logInUser({ login, password }).unwrap();
      const newUserData = await updateUser({
        id,
        body: {
          login: newLogin,
          name: newName,
          password,
        },
      }).unwrap();
      dispatch(setUserInfo(newUserData));
      openDialog(false);
    }
  };

  return (
    <>
      <Modal
        aria-labelledby="alert-dialog-modal-title"
        aria-describedby="alert-dialog-modal-description"
        open={isDialogOpen}
        onClose={onClose}
      >
        <ModalDialog variant="outlined" role="alertdialog">
          <TextField
            name="name"
            title={t('twoToTenLetters')}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            type="text"
            label={t('name')}
            placeholder={t('name')}
            autoComplete="off"
            startDecorator={<AccessibilityNewRoundedIcon />}
            error={!nameValidate(newName)}
            required
          />

          <TextField
            name="login"
            title={t('twoToTenLettersLogin')}
            value={newLogin}
            onChange={(e) => setNewLogin(e.target.value)}
            error={!loginValidate(newLogin)}
            type="text"
            label={t('login')}
            autoComplete="off"
            placeholder={t('login')}
            startDecorator={<PersonRoundedIcon />}
            required
          />
          {updateError && (
            <Typography level="body2" color="danger">
              {t('loginAlreadyExist')}
            </Typography>
          )}

          <Divider sx={{ margin: 2 }} />

          <TextField
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="off"
            placeholder={t('password')}
            label={t('confirmByPassword')}
            startDecorator={<KeyRoundedIcon />}
          />
          {logInError && (
            <Typography level="body2" color="danger">
              {t('wrongPassword')}
            </Typography>
          )}

          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between' }}>
            <Button type="submit" sx={{ mt: 1 }} color="danger" onClick={confirmHandler}>
              {t('change')}
            </Button>
            <Button variant="plain" sx={{ mt: 1 }} color="neutral" onClick={onClose}>
              {t('cancel')}
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </>
  );
};
