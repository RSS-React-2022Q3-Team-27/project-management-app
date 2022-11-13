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
import { setLogin } from '../../store/slices/user/userSlice';
import { authUser } from '../../store/slices/user/userThunks';

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
    reset,
  } = useForm<IFormInput>({
    mode: 'onChange',
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isUserLogIn, locale } = useAppSelector((state) => state.user);

  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    dispatch(setLogin(data.login));
    dispatch(authUser(data));
  };

  useEffect(() => {
    if (isUserLogIn) {
      reset();
      toast.success(t('youveSuccessfullySignedIn'));
      navigate(ROUTES.MAIN.path);
    }
  }, [isUserLogIn, locale, navigate, reset, t]);
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
