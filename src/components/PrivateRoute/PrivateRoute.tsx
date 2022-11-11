import React, { useEffect } from 'react';
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

  useEffect(() => {
    if (!auth) {
      toast.warn('Authorization required !');

      navigate(ROUTES.WELCOME.path);
    }
  });

  return <>{children}</>;
};
