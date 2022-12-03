import DeleteIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/EditOutlined';
import { Box, Card, IconButton, Typography, Tooltip, CardContent, Chip } from '@mui/joy';
import { useContext, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ROUTES } from '../../../../constants/routes';
import { Context } from '../../../../Context/Context';
import { ReducerTypes } from '../../../../Context/contextReducer/ReducerTypes';

import { useAppDispatch } from '../../../../store/hooks';
import { useDeleteBoardMutation } from '../../../../store/slices/boards/boardsApi';
import { BoardType, setCurrentBoard, setIsOpenedDialogEditBoard } from '../../../../store/slices/boards/boardsSlice';
import { useGetTasksByBoardIdQuery } from '../../../../store/slices/tasks/tasksApi';

type BoardCardPropsType = {
  board: BoardType;
};

export const BoardCard: FC<BoardCardPropsType> = ({ board }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { contextDispatch } = useContext(Context);
  const { data: tasksByBoard } = useGetTasksByBoardIdQuery(board['_id']);
  const [deleteBoard] = useDeleteBoardMutation();

  const taskCount = {
    count: tasksByBoard?.length || 0,
  };

  const { title, description } = board;

  const onClickDelete = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    contextDispatch({
      type: ReducerTypes.onConfirmAction,
      payload: () =>
        deleteBoard(board._id)
          .unwrap()
          .then(() => toast.success(t('boardDeleted')))
          .catch(() => toast.error(t('serverError'))),
    });
  };

  const onClickEdit = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(setCurrentBoard(board));
    dispatch(setIsOpenedDialogEditBoard(true));
  };

  return (
    <Link to={`${ROUTES.BOARD.path}/${board._id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ width: 280, minHeight: 120, height: '100%' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
            {title}
          </Typography>
          <Typography level="body1" textColor="text.secondary" sx={{ height: '100%', flexGrow: 1 }}>
            {description}
          </Typography>

          <Box
            sx={{
              justifySelf: 'space-between',
              alignSelf: 'flex-end',
              display: 'flex',
              gap: 1,
              mt: 1,
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Chip size="md" variant="outlined" color="neutral" sx={{ borderRadius: 'sm' }}>
              {t('taskCount', taskCount)}
            </Chip>

            <Tooltip title={t('edit')} arrow placement="bottom" size="sm">
              <IconButton color="neutral" variant="soft" size="sm" onClick={onClickEdit} sx={{ ml: 'auto' }}>
                <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={t('delete')} arrow placement="bottom" size="sm">
              <IconButton color="neutral" variant="soft" size="sm" onClick={onClickDelete}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};
