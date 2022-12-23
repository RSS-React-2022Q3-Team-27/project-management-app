import { getTimeBeforeExit } from './getTimeBeforeExit';

export const getLoginState = () => {
  const timer = getTimeBeforeExit();
  if (timer && timer > 0) {
    return true;
  }

  return false;
};
