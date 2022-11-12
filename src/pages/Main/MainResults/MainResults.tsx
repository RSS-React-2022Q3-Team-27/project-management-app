import { Box } from '@mui/joy';

import { useAppSelector } from '../../../store/hooks';
import { BoardCard } from '../BoardCard/BoardCard';

export const MainResults = () => {
  const { boards } = useAppSelector((state) => state.boards);
  const cards = boards.map((board) => <BoardCard key={board._id} board={board} />);
  console.log(cards);

  return <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>{cards}</Box>;
};
