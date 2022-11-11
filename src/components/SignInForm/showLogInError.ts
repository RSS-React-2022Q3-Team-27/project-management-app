import { toast } from 'react-toastify';

export const showLogInError = (errorCode: number) => {
  if (errorCode === 401) {
    toast.error('Wrong Login or Password');
  } else {
    toast.error('Server error, please try again later');
  }
};
