import React from 'react';
import { Navigate } from 'react-router-dom';

import { ROUTES } from '../../constants/routes';
import { useAppSelector } from '../../store/hooks';

type PrivateRoutePropsType = {
  children: React.ReactNode;
};

export const PrivateRoute = ({ children }: PrivateRoutePropsType) => {
  const auth = useAppSelector((state) => state.user.isUserLogIn);

  if (!auth) {
    return <Navigate to={`${ROUTES.WELCOME.path}`} />;
  }

  return <>{children}</>;
};
