import DeleteIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/EditOutlined';
import { Box, Card, IconButton, Typography } from '@mui/joy';

import { BoardType } from '../../../store/slices/boards/boardsSlice';

type BoardCardPropsType = {
  board: BoardType;
};

export const BoardCard: React.FC<BoardCardPropsType> = ({ board }) => {
  return (
    <Card variant="outlined" sx={{ width: 280, height: 280, display: 'flex', flexDirection: 'column' }}>
      <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
        Title: {board.title}
      </Typography>
      <Typography level="body2" sx={{ height: '100%' }}>
        Description: None
      </Typography>

      <Box sx={{ justifySelf: 'flex-end', alignSelf: 'flex-end', display: 'flex', gap: 1 }}>
        <IconButton color="neutral" variant="soft" size="sm">
          <EditIcon />
        </IconButton>
        <IconButton color="neutral" variant="soft" size="sm">
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
};
