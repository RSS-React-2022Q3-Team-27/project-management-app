import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';

import { DialogEditBoard } from '../../../components/DialogEditBoard/DialogEditBoard';
import { useAppSelector } from '../../../store/hooks';
import { useGetBoardsByUserIdQuery } from '../../../store/slices/boards/boardsApi';
import { BoardCard } from '../BoardCard/BoardCard';

export const MainResults = () => {
  const { isOpenedDialogEditBoard } = useAppSelector((state) => state.boards);
  const { id: userId } = useAppSelector((state) => state.user);
  const { data: boards, isLoading } = useGetBoardsByUserIdQuery(userId);

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
