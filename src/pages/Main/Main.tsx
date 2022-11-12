import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Sheet, TextField, Typography } from '@mui/joy';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DialogAddBoard from './DialogAddBoard/DialogAddBoard';
import { MainResults } from './MainResults/MainResults';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getBoardsByUserId } from '../../store/slices/boards/boardsThunks';

export const Main = () => {
  const userId = useAppSelector((state) => state.user.id);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [isOpenedDialogAddBoard, setIsOpenedDialogAddBoard] = useState(false);

  useEffect(() => {
    dispatch(getBoardsByUserId(userId));
  }, [dispatch, userId]);

  return (
    <Sheet
      sx={{
        height: '100%',
        mx: 'auto',
        py: 3,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
      variant="soft"
    >
      <Box sx={{ maxWidth: 350, minWidth: 280 }}>
        <TextField type="text" placeholder={t('search')} variant="outlined" startDecorator={<SearchIcon />} />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'space-between' }}>
        <Typography level="h2">{t('boards')}</Typography>
        <Button
          color="neutral"
          variant="plain"
          startDecorator={<AddIcon />}
          onClick={() => setIsOpenedDialogAddBoard(true)}
        >
          {t('newBoard')}
        </Button>
      </Box>

      <MainResults />
      <DialogAddBoard isOpened={isOpenedDialogAddBoard} closeHandle={() => setIsOpenedDialogAddBoard(false)} />
    </Sheet>
  );
};
