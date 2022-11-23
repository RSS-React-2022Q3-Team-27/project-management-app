import { toast } from 'react-toastify';

import { IRegError } from './SignUpForm';

import i18n from '../../translation/i18n';

export const errorHandler = (error: IRegError) => {
  if (error.status === 409) {
    toast.error(i18n.t('loginAlreadyExist'));
    return;
  }
  toast.error(i18n.t('serverError'));
};
