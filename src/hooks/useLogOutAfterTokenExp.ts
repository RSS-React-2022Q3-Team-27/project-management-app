import { useEffect } from 'react';

import { useAppDispatch } from '../store/hooks';

import { userLogOut } from '../store/slices/user/userSlice';
import { usersApi } from '../store/slices/users/usersApi';
import { getUsers } from '../store/slices/users/usersThunks';
import { getTimeBeforeExit } from '../utils/getTimeBeforeExit';

export const useLogOutAfterTokenExp = () => {
  const dispatch = useAppDispatch();
  const timer = getTimeBeforeExit();
  useEffect(() => {
    if (timer > 0) {
      dispatch(getUsers());
      const timeout = setTimeout(() => {
        dispatch(userLogOut());
        dispatch(usersApi.util.resetApiState());
      }, timer);
      return () => clearTimeout(timeout);
    }
  }, [dispatch, timer]);
};
