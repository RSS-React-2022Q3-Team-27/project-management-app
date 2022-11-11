import { toast, ToastOptions } from 'react-toastify';

const props: ToastOptions = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

export const showSuccessLogInMsg = (errorCode: number) => {
  if (errorCode === 401) {
    toast.error('Wrong Login or Password', props);
  } else {
    toast.error('Server error, please try again later', props);
  }
};
