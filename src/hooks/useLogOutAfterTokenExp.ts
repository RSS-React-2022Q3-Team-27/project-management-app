import { useEffect } from 'react';

import { useAppDispatch } from '../store/hooks';

import { userLogOut } from '../store/slices/user/userSlice';
import { getUsers } from '../store/slices/users/usersThunks';
import { getTimeBeforeExit } from '../utils/getTimeBeforeExit';

export const useLogOutAfterTokenExp = () => {
  const dispatch = useAppDispatch();
  const timer = getTimeBeforeExit();
  useEffect(() => {
    if (timer) {
      dispatch(getUsers());
      const timeout = setTimeout(() => {
        dispatch(userLogOut());
      }, timer);
      return () => clearTimeout(timeout);
    }
  }, [dispatch, timer]);
};
