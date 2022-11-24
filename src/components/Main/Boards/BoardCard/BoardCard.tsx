import DeleteIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/EditOutlined';
import { Box, Card, IconButton, Typography, Tooltip, CardContent } from '@mui/joy';
import { useContext, useEffect, FC } from 'react';
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
  const [deleteBoard, { isSuccess }] = useDeleteBoardMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(t('boardDeleted'));
    }
  }, [isSuccess, t]);

  const taskCount = {
    count: tasksByBoard?.length || 0,
  };

  const { title, description } = board;

  const onClickDelete = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    contextDispatch({ type: ReducerTypes.cb, payload: () => deleteBoard(board._id) });
  };

  const onClickEdit = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(setCurrentBoard(board));
    dispatch(setIsOpenedDialogEditBoard(true));
  };

  return (
    <Link to={`${ROUTES.BOARD.path}/${board._id}`} style={{ textDecoration: 'none' }}>
      <Card variant="outlined" sx={{ width: 280, minHeight: 280, height: '100%' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
            {title}
          </Typography>
          <Typography level="body1" sx={{ height: '100%', flexGrow: 1 }}>
            {description}
          </Typography>

          <Box>
            <Typography level="body2" textAlign="right">
              {t('taskCount', taskCount)}
            </Typography>
          </Box>

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
        </CardContent>
      </Card>
    </Link>
  );
};
