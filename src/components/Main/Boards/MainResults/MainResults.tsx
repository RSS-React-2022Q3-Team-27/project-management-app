import { Typography } from '@mui/joy';
import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useGetBoardsByUserIdQuery } from '../../../../store/slices/boards/boardsApi';
import { setBoards } from '../../../../store/slices/boards/boardsSlice';

import { DialogEditBoard } from '../../../DialogEditBoard/DialogEditBoard';
import { BoardCard } from '../BoardCard';

export const MainResults = () => {
  const { isOpenedDialogEditBoard } = useAppSelector((state) => state.boards);
  const { id: userId } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { data: boards, isLoading, isSuccess } = useGetBoardsByUserIdQuery(userId);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setBoards(boards));
    }
  });

  const cards =
    boards && boards.length > 0 ? (
      boards.map((board) => <BoardCard key={board._id} board={board} />)
    ) : (
      <Typography level="h2" fontSize="lg" sx={{ mt: 6, mx: 'auto' }}>
        {t('noBoards')}
      </Typography>
    );

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: { xs: 'center', sm: 'center', md: 'center', lg: 'flex-start' },
          gap: 2,
        }}
      >
        {isLoading ? <CircularProgress color="primary" value={25} sx={{ mx: 'auto', mt: 6 }} /> : cards}
      </Box>

      {isOpenedDialogEditBoard ? <DialogEditBoard /> : null}
    </>
  );
};
