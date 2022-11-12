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
  const token = useAppSelector((state) => state.user.token);
  const decryptedToken = token && (jwtDecode(token) as IToken);
  const timer = decryptedToken && Math.ceil(+((decryptedToken.exp - Date.now() / 1000) * 1000).toFixed(2));

  useEffect(() => {
    if (timer) {
      setTimeout(() => {
        dispatch(userLogOut());
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
