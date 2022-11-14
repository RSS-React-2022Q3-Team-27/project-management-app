import { Button } from '@mui/joy';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { setIsOpenedDialogAddBoard } from '../../../store/slices/boards/boardsSlice';

export const CreateNewBoard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(setIsOpenedDialogAddBoard(true));
  };

  return (
    <Button color="primary" variant="plain" onClick={onClick}>
      {t('createNewBoard')}
    </Button>
  );
};
