import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { ROUTES } from '../../constants/routes';
import { useAppSelector } from '../../store/hooks';

type PrivateRoutePropsType = {
  children: React.ReactNode;
};

export const PrivateRoute = ({ children }: PrivateRoutePropsType) => {
  const auth = useAppSelector((state) => state.user.isUserLogIn);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (!auth) {
      toast.warn(t('authRequired'), {
        toastId: 'authRequired',
      });

      navigate(ROUTES.WELCOME.path);
    }
  }, [auth, navigate, t]);

  return <>{children}</>;
};
