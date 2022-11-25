import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useGetBoardsByUserIdQuery } from '../../../../store/slices/boards/boardsApi';
import { setBoards } from '../../../../store/slices/boards/boardsSlice';

import { DialogEditBoard } from '../../../DialogEditBoard/DialogEditBoard';
import { BoardCard } from '../BoardCard';

export const MainResults = () => {
  const { isOpenedDialogEditBoard } = useAppSelector((state) => state.boards);
  const { id: userId } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const { data: boards, isLoading, isSuccess } = useGetBoardsByUserIdQuery(userId);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setBoards(boards));
    }
  });

  const cards = boards?.map((board) => <BoardCard key={board._id} board={board} />);

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
        {isLoading ? <CircularProgress color="primary" size="lg" value={25} variant="soft" /> : cards}
      </Box>

      {isOpenedDialogEditBoard ? <DialogEditBoard /> : null}
    </>
  );
};
