import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '../../../../store/hooks';
import { setIsOpenedDialogAddBoard } from '../../../../store/slices/boards/boardsSlice';

export const MainHeader = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onClick = () => {
    dispatch(setIsOpenedDialogAddBoard(true));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'space-between' }}>
      <Typography level="h2">{t('boards')}</Typography>
      <Button
        color="neutral"
        variant="outlined"
        sx={{ width: 150 }}
        startDecorator={<AddIcon color="primary" />}
        onClick={onClick}
      >
        {t('newBoard')}
      </Button>
    </Box>
  );
};
