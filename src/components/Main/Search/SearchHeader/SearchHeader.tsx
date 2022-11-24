import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import Box from '@mui/joy/Box';
import ButtonRoot from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '../../../../store/hooks';
import { setSearchQuery } from '../../../../store/slices/tasks/tasksSlice';

export const SearchHeader = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onClick = () => {
    dispatch(setSearchQuery(''));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'space-between' }}>
      <Typography level="h2">{t('Search')}</Typography>
      <ButtonRoot color="neutral" variant="plain" startDecorator={<ArrowBackIcon />} onClick={onClick}>
        {t('toBoards')}
      </ButtonRoot>
    </Box>
  );
};
