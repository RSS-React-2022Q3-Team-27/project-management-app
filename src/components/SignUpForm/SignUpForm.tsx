import Button from '@mui/joy/Button';

import TextField from '@mui/joy/TextField';
import Typography from '@mui/joy/Typography';
import { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AvatarModal } from './Avatar/AvatarModal';

import { ROUTES } from '../../constants/routes';
import { URL as serverURL } from '../../constants/URL';
import { useAppDispatch } from '../../store/hooks';
import { useUploadFileMutation } from '../../store/slices/files/filesApi';
import { useCreateUserMutation, useLogInUserMutation } from '../../store/slices/user/authApi';
import { setAvatar, setAvatarInfo, setIsUserLogIn, setToken, setUserInfo } from '../../store/slices/user/userSlice';
import { errorHandler } from '../../utils/errorHandler';
import { getFormData } from '../../utils/getFormData';

export interface IFormInput {
  name: string;
  login: string;
  password: string;
  passwordConfirm: string;
}

export interface IRegError {
  status: number;
  data: {
    statusCode: number;
    message: string;
  };
}

export const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { t } = useTranslation();
  const [createUser, { isLoading: createUserLoading }] = useCreateUserMutation();
  const [logInUser, { isLoading: ligInUserLoading }] = useLogInUserMutation();
  const [uploadFile, { isLoading: avatarLoading }] = useUploadFileMutation();
  const [file, setFile] = useState<File | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: 'onChange',
  });

  const uploadAvatar = async (login: string) => {
    if (file) {
      uploadFile(getFormData(login, file))
        .unwrap()
        .then((data) => {
          dispatch(setAvatarInfo(data));
          dispatch(setAvatar(`${serverURL}${data.path}`));
        })
        .catch(() => toast.error(t('serverError')));
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    const { passwordConfirm, ...restData } = data;

    if (passwordConfirm === restData.password) {
      const userData = await createUser(restData)
        .unwrap()
        .catch((error) => errorHandler(error));

      if (!userData) {
        return;
      }

      dispatch(setUserInfo(userData));

      const token = await logInUser({ login: data.login, password: data.password })
        .unwrap()
        .catch((error) => errorHandler(error));

      if (!token) {
        return;
      }

      dispatch(setToken(token));

      await uploadAvatar(restData.login);

      dispatch(setIsUserLogIn(true));

      navigate(ROUTES.MAIN.path);
    } else {
      toast.error(t('pswdNotMach'));
    }
  };

  useEffect(() => {
    if (file) {
      dispatch(setAvatar(URL.createObjectURL(file)));
    }
  }, [dispatch, file]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="false">
      <Controller
        name="name"
        control={control}
        defaultValue=""
        rules={{
          required: {
            value: true,
            message: t('fieldIsRequire'),
          },
          pattern: {
            value: /^[a-zA-Zа-яА-Я]{2,15}$/,
            message: t('twoToTenLetters'),
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
            sx={{ mb: errors.name ? 0 : 2.75 }}
          />
        )}
      />
      {errors.name && (
        <Typography level="body2" color="danger" sx={{ height: 22 }}>
          {t('twoToTenLetters')}
        </Typography>
      )}

      <Controller
        name="login"
        control={control}
        defaultValue=""
        rules={{
          required: {
            value: true,
            message: t('fieldIsRequire'),
          },
          pattern: {
            value: /^[a-zA-Z0-9]{2,15}$/,
            message: t('twoToTenLettersLogin'),
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
            sx={{ mb: errors.login ? 0 : 2.75 }}
          />
        )}
      />
      {errors.login && (
        <Typography level="body2" color="danger" sx={{ height: 22 }}>
          {t('twoToTenLettersLogin')}
        </Typography>
      )}
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
            label={t('password')}
            sx={{ mb: errors.password ? 0 : 2.75 }}
          />
        )}
      />
      {errors.password && (
        <Typography level="body2" color="danger" sx={{ height: 22 }}>
          {t('fieldIsRequire')}
        </Typography>
      )}
      <Controller
        name="passwordConfirm"
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
            placeholder={t('verifyPassword')}
            label={t('verifyPassword')}
            sx={{ mb: errors.passwordConfirm ? 0 : 2.75 }}
          />
        )}
      />
      {errors.passwordConfirm && (
        <Typography level="body2" color="danger" sx={{ height: 22 }}>
          {t('fieldIsRequire')}
        </Typography>
      )}
      <AvatarModal setFile={setFile} />
      <Button
        type="submit"
        loading={createUserLoading || ligInUserLoading || avatarLoading}
        sx={{ width: '100%', mt: 1 }}
      >
        {t('signUp')}
      </Button>
    </form>
  );
};
