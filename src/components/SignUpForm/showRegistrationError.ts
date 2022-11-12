import { toast } from 'react-toastify';

export const showRegistrationError = (errorCode: number) => {
  if (errorCode === 409) {
    toast.error('Login already exist');
  } else {
    toast.error('Server error, please try again later');
  }
};
