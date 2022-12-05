import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Button from '@mui/joy/Button';

import TextField from '@mui/joy/TextField';
import Typography from '@mui/joy/Typography';
import { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useLogInUserMutation } from '../../store/slices/user/authApi';
import { setIsUserLogIn, setLogin, setToken, setUserInfo } from '../../store/slices/user/userSlice';
import { useGetUsersQuery } from '../../store/slices/users/usersApi';
import { getFilesByUserId, getUserDataByLogin } from '../../store/slices/users/usersThunks';
import { errorHandler } from '../../utils/errorHandler';

interface IFormInput {
  login: string;
  password: string;
}

export const SignInForm = () => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: 'onChange',
  });
  const { login, token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [logInUser, { error: logInError, isLoading: logInUserLoading }] = useLogInUserMutation();
  const [skip, setSkip] = useState(true);
  const { data: usersData, isError, isLoading: getUsersLoading } = useGetUsersQuery(undefined, { skip });

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    const token = await logInUser({ login: data.login, password: data.password })
      .unwrap()
      .catch((error) => errorHandler(error));
    if (!token) {
      return;
    }
    dispatch(setToken(token));
    dispatch(setLogin(data.login));
    dispatch(getFilesByUserId(data.login));
    setSkip(false);
  };

  useEffect(() => {
    if (usersData) {
      dispatch(setUserInfo(getUserDataByLogin(usersData, login)));
      dispatch(setIsUserLogIn(true));
      toast.success(t('youveSuccessfullySignedIn'), {
        toastId: 'youveSuccessfullySignedIn',
      });
    }
  }, [dispatch, login, t, usersData]);

  useEffect(() => {
    if (isError && token) {
      toast.error(t('serverError'), {
        toastId: 'serverError',
      });
    }
  }, [isError, logInError, t, token]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="false">
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
            message: t('wrongFormat'),
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            type="text"
            label={t('login')}
            placeholder={t('login')}
            startDecorator={<PersonRoundedIcon color="primary" />}
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
            type="password"
            placeholder={t('password')}
            label={t('password')}
            startDecorator={<KeyRoundedIcon color="primary" />}
            sx={{ mb: errors.password ? 0 : 2.75 }}
          />
        )}
      />
      {errors.password && (
        <Typography level="body2" color="danger" sx={{ height: 22 }}>
          {t('fieldIsRequire')}
        </Typography>
      )}

      <Button type="submit" sx={{ mt: 1, width: '100%' }} loading={logInUserLoading || getUsersLoading}>
        {t('signIn')}
      </Button>
    </form>
  );
};
