import DeleteIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/EditOutlined';
import { Box, Card, IconButton, Typography, Tooltip } from '@mui/joy';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../../constants/routes';

import { useAppDispatch } from '../../../store/hooks';
import { setConfirmOpened } from '../../../store/slices/app/appSlice';
import { BoardType } from '../../../store/slices/boards/boardsSlice';

type BoardCardPropsType = {
  board: BoardType;
  setBoardId: (id: string) => void;
};

export const BoardCard: React.FC<BoardCardPropsType> = ({ board, setBoardId }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { title, description } = JSON.parse(board.title);

  const onClickDelete = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setBoardId(board._id);
    dispatch(setConfirmOpened(true));
  };
  const onClickEdit = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  };

  return (
    <Link to={`${ROUTES.BOARD.path}/${board._id}`} style={{ textDecoration: 'none' }}>
      <Card variant="outlined" sx={{ width: 280, height: 280, display: 'flex', flexDirection: 'column' }}>
        <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
          {title}
        </Typography>
        <Typography level="body2" sx={{ height: '100%' }}>
          {description}
        </Typography>

        <Box sx={{ justifySelf: 'flex-end', alignSelf: 'flex-end', display: 'flex', gap: 1 }}>
          <Tooltip title={t('edit')} arrow placement="bottom" variant="solid">
            <IconButton color="neutral" variant="soft" size="sm" onClick={onClickEdit}>
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={t('delete')} arrow placement="bottom" variant="solid">
            <IconButton color="neutral" variant="soft" size="sm" onClick={onClickDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Card>
    </Link>
  );
};
