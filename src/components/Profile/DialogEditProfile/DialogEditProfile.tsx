import AccessibilityNewRoundedIcon from '@mui/icons-material/AccessibilityNewRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { Box, Divider } from '@mui/joy';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import TextField from '@mui/joy/TextField';
import Typography from '@mui/joy/Typography';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { toast } from 'react-toastify';

import { loginValidate } from './loginValidate';

import { nameValidate } from './nameValidate';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setLogInErrorCode } from '../../../store/slices/user/userSlice';
import { authUser, ICreateUser, updateUser } from '../../../store/slices/user/userThunks';

interface IProps {
  openDialog: (value: boolean) => void;
  isDialogOpen: boolean;
}

export const DialogEditProfile = ({ openDialog, isDialogOpen }: IProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { userName, login, logInErrorCode, updateError } = useAppSelector((state) => state.user);
  const [newName, setNewName] = useState(userName);
  const [newLogin, setNewLogin] = useState(login);
  const [password, setPassword] = useState('');
  const [changeInput, setChangeInput] = useState(true);
  const [data, setData] = useState<null | ICreateUser>(null);

  const onClose = () => {
    openDialog(false);
  };

  const confirmHandler = () => {
    setChangeInput(false);
    dispatch(authUser({ login, password }));
  };

  const passwordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangeInput(true);
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (logInErrorCode === 200) {
      dispatch(updateUser({ name: newName, login: newLogin, password: 'test' }));
      console.log('updateUser');
      dispatch(setLogInErrorCode());
    }
  }, [dispatch, data, logInErrorCode, newName, newLogin, password, openDialog]);

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
          {updateError === 409 && (
            <Typography level="body2" color="danger">
              {t('loginAlreadyExist')}
            </Typography>
          )}

          <Divider sx={{ margin: 2 }} />

          <TextField
            name="password"
            value={password}
            onChange={passwordOnChange}
            type="password"
            autoComplete="off"
            placeholder={t('password')}
            label={t('confirmByPassword')}
            startDecorator={<KeyRoundedIcon />}
          />
          {logInErrorCode === 401 && !changeInput && (
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
