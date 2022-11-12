import DeleteIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/EditOutlined';
import { Box, Card, IconButton, Typography, Tooltip } from '@mui/joy';
import { useTranslation } from 'react-i18next';

import { BoardType } from '../../../store/slices/boards/boardsSlice';

type BoardCardPropsType = {
  board: BoardType;
};

export const BoardCard: React.FC<BoardCardPropsType> = ({ board }) => {
  const { t } = useTranslation();

  return (
    <Card variant="outlined" sx={{ width: 280, height: 280, display: 'flex', flexDirection: 'column' }}>
      <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
        {board.title}
      </Typography>
      <Typography level="body2" sx={{ height: '100%' }}>
        None
      </Typography>

      <Box sx={{ justifySelf: 'flex-end', alignSelf: 'flex-end', display: 'flex', gap: 1 }}>
        <Tooltip title={t('edit')} arrow placement="bottom" variant="solid">
          <IconButton color="neutral" variant="soft" size="sm">
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title={t('delete')} arrow placement="bottom" variant="solid">
          <IconButton color="neutral" variant="soft" size="sm">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
  );
};
