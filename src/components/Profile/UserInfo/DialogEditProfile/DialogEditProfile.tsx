import AccessibilityNewRoundedIcon from '@mui/icons-material/AccessibilityNewRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { Box, Divider } from '@mui/joy';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import TextField from '@mui/joy/TextField';
import Typography from '@mui/joy/Typography';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useLogInUserMutation } from '../../../../store/slices/user/authApi';
import { setUserInfo } from '../../../../store/slices/user/userSlice';
import { useUpdateUserMutation } from '../../../../store/slices/users/usersApi';

interface IFormInput {
  name: string;
  login: string;
  password: string;
}

interface IProps {
  openDialog: (value: boolean) => void;
  isDialogOpen: boolean;
}

export const DialogEditProfile = ({ openDialog, isDialogOpen }: IProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { userName, login, id } = useAppSelector((state) => state.user);
  const [logInUser, { error: logInError, isLoading: logInUserLoading }] = useLogInUserMutation();
  const [updateUser, { error: updateError, isLoading: updateUserLoading }] = useUpdateUserMutation();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: 'onChange',
  });

  const onClose = () => {
    openDialog(false);
  };

  const confirmHandler: SubmitHandler<IFormInput> = (data) => {
    logInUser({ login, password: data.password })
      .unwrap()
      .then(async () => {
        const newUserData = await updateUser({
          id,
          body: {
            login: data.login,
            name: data.name,
            password: data.password,
          },
        })
          .unwrap()
          .catch(() => toast.error(t('serverError')));

        if (!newUserData) {
          return;
        }

        dispatch(setUserInfo(newUserData));
        openDialog(false);
        reset({
          name: userName,
          login,
          password: '',
        });
      })
      .catch(() => {});
  };

  return (
    <>
      <Modal
        aria-labelledby="alert-dialog-modal-title"
        aria-describedby="alert-dialog-modal-description"
        open={isDialogOpen}
        onClose={onClose}
      >
        <ModalDialog variant="outlined" role="alertdialog" sx={{ border: 'none' }}>
          <form onSubmit={handleSubmit(confirmHandler)} autoComplete="false">
            <Controller
              name="name"
              control={control}
              defaultValue={userName}
              rules={{
                required: {
                  value: true,
                  message: t('fieldIsRequire'),
                },
                pattern: {
                  value: /[a-zA-Zа-яА-Я]{2,10}$/,
                  message: `${t('wrongFormat')} (${t('twoToTenLetters')})`,
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  type="text"
                  label={t('name')}
                  placeholder={t('name')}
                  autoComplete="off"
                  title={t('twoToTenLetters')}
                  startDecorator={<AccessibilityNewRoundedIcon />}
                />
              )}
            />
            {errors.name && (
              <Typography level="body2" color="danger">
                {errors.name.message}
              </Typography>
            )}

            <Controller
              name="login"
              control={control}
              defaultValue={login}
              rules={{
                required: {
                  value: true,
                  message: t('fieldIsRequire'),
                },
                pattern: {
                  value: /[a-zA-Z0-9]{2,10}$/,
                  message: `${t('wrongFormat')} (${t('twoToTenLettersLogin')})`,
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  type="text"
                  label={t('login')}
                  autoComplete="off"
                  title={t('twoToTenLettersLogin')}
                  placeholder={t('login')}
                  sx={{ mt: 2 }}
                  startDecorator={<PersonRoundedIcon />}
                />
              )}
            />
            {errors.login && (
              <Typography level="body2" color="danger">
                {errors.login.message}
              </Typography>
            )}
            {updateError && (
              <Typography level="body2" color="danger">
                {t('loginAlreadyExist')}
              </Typography>
            )}

            <Divider sx={{ my: 3 }} />

            <Controller
              name="password"
              defaultValue=""
              control={control}
              rules={{
                required: {
                  value: true,
                  message: t('fieldIsRequire'),
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  type="password"
                  autoComplete="off"
                  placeholder={t('password')}
                  label={t('confirmByPassword')}
                  startDecorator={<KeyRoundedIcon />}
                />
              )}
            />
            {errors.password && (
              <Typography level="body2" color="danger">
                {errors.password.message}
              </Typography>
            )}
            {logInError && (
              <Typography level="body2" color="danger">
                {t('wrongPassword')}
              </Typography>
            )}

            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between', mt: 1 }}>
              <Button type="button" variant="plain" sx={{ mt: 1 }} color="neutral" onClick={onClose}>
                {t('cancel')}
              </Button>
              <Button type="submit" sx={{ mt: 1 }} color="danger" loading={logInUserLoading || updateUserLoading}>
                {t('change')}
              </Button>
            </Box>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
};
