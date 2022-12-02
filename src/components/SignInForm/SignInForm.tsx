import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Button from '@mui/joy/Button';

import TextField from '@mui/joy/TextField';
import Typography from '@mui/joy/Typography';
import React, { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ROUTES } from '../../constants/routes';
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
  const { login, token, isUserLogIn } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
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
    dispatch(setIsUserLogIn(true));
    dispatch(setLogin(data.login));
    dispatch(getFilesByUserId(data.login));
    setSkip(false);
  };

  useEffect(() => {
    if (usersData && isUserLogIn) {
      dispatch(setUserInfo(getUserDataByLogin(usersData, login)));
      toast.success(t('youveSuccessfullySignedIn'));
      navigate(ROUTES.MAIN.path);
    }
  }, [dispatch, isUserLogIn, login, navigate, t, usersData]);

  useEffect(() => {
    if (isError && token) {
      toast.error(t('serverError'));
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
            value: /[a-zA-Z0-9]{2,10}$/,
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
          />
        )}
      />
      {errors.login && (
        <Typography level="body2" color="danger">
          {errors.login.message}
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
            sx={{ mt: 2 }}
          />
        )}
      />
      {errors.password && (
        <Typography level="body2" color="danger">
          {errors.password.message}
        </Typography>
      )}

      <Button type="submit" sx={{ mt: 4, width: '100%' }} loading={logInUserLoading || getUsersLoading}>
        {t('signIn')}
      </Button>
    </form>
  );
};
