import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';

import { userLogOut } from '../store/slices/user/userSlice';

export interface IToken {
  id: string;
  login: string;
  iat: number;
  exp: number;
}

export const useLogOutAfterTokenExp = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);
  const decryptedToken = token && (jwtDecode(token) as IToken);
  const timer = decryptedToken && Math.ceil(+((decryptedToken.exp - Date.now() / 1000) * 1000).toFixed(2));
  useEffect(() => {
    if (timer) {
      const timeout = setTimeout(() => {
        dispatch(userLogOut());
      }, timer);
      return () => clearTimeout(timeout);
    }
  }, [decryptedToken, dispatch, timer]);
};
