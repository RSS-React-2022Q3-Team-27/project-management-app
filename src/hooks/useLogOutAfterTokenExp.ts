import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';

import { setIsUserLogIn, userLogOut } from '../store/slices/user/userSlice';
import { getUsers } from '../store/slices/users/usersThunks';

export interface IToken {
  exp: number;
  iat: number;
  id: string;
}

export const useLogOutAfterTokenExp = () => {
  const dispatch = useAppDispatch();
  const { token, id } = useAppSelector((state) => state.user);
  const decryptedToken = id && token && (jwtDecode(token) as IToken);
  const timer = decryptedToken && Math.ceil(+((decryptedToken.exp - Date.now() / 1000) * 1000).toFixed(2));

  useEffect(() => {
    if (timer) {
      const timeout = setTimeout(() => {
        dispatch(userLogOut());
        return () => clearTimeout(timeout);
      }, timer);
    }
    if (decryptedToken) {
      dispatch(setIsUserLogIn(true));
      dispatch(getUsers());
    }
    if (!decryptedToken) {
      dispatch(setIsUserLogIn(false));
    }
  }, [decryptedToken, dispatch, timer]);
};
