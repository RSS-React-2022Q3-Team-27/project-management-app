import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Button from '@mui/joy/Button';

import TextField from '@mui/joy/TextField';
import Typography from '@mui/joy/Typography';
import React, { useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ROUTES } from '../../constants/routes';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useLogInUserMutation } from '../../store/slices/user/authApi';
import { setIsUserLogIn, setLogin, setToken, setUserInfo } from '../../store/slices/user/userSlice';
import { useGetUsersQuery } from '../../store/slices/users/usersApi';
import { getUserDataByLogin } from '../../store/slices/users/usersThunks';
import { IRegError } from '../SignUpForm/SignUpForm';

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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logInUser, { error: logInError }] = useLogInUserMutation();
  const { data: usersData, refetch, error: getUsersError } = useGetUsersQuery(undefined);

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    const token = await logInUser({ login: data.login, password: data.password });
    dispatch(setToken(token));
    dispatch(setIsUserLogIn(true));
    dispatch(setLogin(data.login));
    toast.success(t('youveSuccessfullySignedIn'));
    refetch();
  };

  useEffect(() => {
    if (usersData) {
      dispatch(setUserInfo(getUserDataByLogin(usersData, login)));
      navigate(ROUTES.MAIN.path);
    }
  }, [dispatch, login, navigate, usersData]);

  useEffect(() => {
    const error = logInError as IRegError;
    if (error) {
      toast.error(t(error.status === 401 ? 'wrongLoginOrPassword' : 'serverError'));
    }
  }, [logInError, t]);

  useEffect(() => {
    if (getUsersError && token) {
      toast.error(t('serverError'));
    }
  }, [getUsersError, logInError, t, token]);
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
            startDecorator={<PersonRoundedIcon />}
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
            startDecorator={<KeyRoundedIcon />}
          />
        )}
      />
      {errors.password && (
        <Typography level="body2" color="danger">
          {errors.password.message}
        </Typography>
      )}

      <Button type="submit" sx={{ mt: 1 }}>
        {t('signIn')}
      </Button>
    </form>
  );
};
