import AccessibilityNewRoundedIcon from '@mui/icons-material/AccessibilityNewRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Button from '@mui/joy/Button';

import TextField from '@mui/joy/TextField';
import Typography from '@mui/joy/Typography';
import { useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ROUTES } from '../../constants/routes';
import { useAppDispatch } from '../../store/hooks';
import { useCreateUserMutation, useLogInUserMutation } from '../../store/slices/user/authApi';
import { setIsUserLogIn, setToken, setUserInfo } from '../../store/slices/user/userSlice';

interface IFormInput {
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
  const { t } = useTranslation();
  const [createUser, { error: regError }] = useCreateUserMutation();
  const [logInUser, { error: logInError }] = useLogInUserMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    const { passwordConfirm, ...restData } = data;
    if (passwordConfirm === restData.password) {
      const userData = await createUser(restData).unwrap();
      dispatch(setUserInfo(userData));
      const token = await logInUser({ login: data.login, password: data.password }).unwrap();
      dispatch(setToken(token));
      dispatch(setIsUserLogIn(true));
      navigate(ROUTES.MAIN.path);
    } else {
      toast.error(t('pswdNotMach'));
    }
  };

  useEffect(() => {
    const er = regError as IRegError;
    if (er && er.status === 409) {
      toast.error(t('loginAlreadyExist'));
    } else if (er) {
      toast.error(t('serverError'));
    }
  }, [regError, t]);

  useEffect(() => {
    if (logInError) {
      toast.error(t('serverError'));
    }
  }, [logInError, t]);

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
            value: /[a-zA-Zа-яА-Я]{2,10}$/,
            message: t('wrongFormat'),
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
            required
            type="text"
            label={t('login')}
            autoComplete="off"
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
            required
            type="password"
            autoComplete="off"
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
            startDecorator={<KeyRoundedIcon />}
          />
        )}
      />
      {errors.passwordConfirm && (
        <Typography level="body2" color="danger">
          {errors.passwordConfirm.message}
        </Typography>
      )}
      <Button type="submit" sx={{ mt: 1 }}>
        {t('signUp')}
      </Button>
    </form>
  );
};
