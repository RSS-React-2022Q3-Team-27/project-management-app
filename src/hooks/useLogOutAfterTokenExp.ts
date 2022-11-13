import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';

import { userLogOut } from '../store/slices/user/userSlice';
import { getTimeBeforeExit } from '../utils/getTimeBeforeExit';

export const useLogOutAfterTokenExp = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);
  const timer = getTimeBeforeExit(token);
  useEffect(() => {
    if (timer) {
      const timeout = setTimeout(() => {
        dispatch(userLogOut());
      }, timer);
      return () => clearTimeout(timeout);
    }
  }, [dispatch, timer]);
};
