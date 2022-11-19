import { Draggable } from '@hello-pangea/dnd';
import MoreIcon from '@mui/icons-material/MoreHoriz';
import { Card, CardContent, Typography, IconButton, Menu, MenuItem } from '@mui/joy';
import Box from '@mui/joy/Box';
import { FC, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { Context } from '../../Context/Context';

import { ReducerTypes } from '../../Context/contextReducer/ReducerTypes';

import { useAppDispatch } from '../../store/hooks';

import { TaskType, useDeleteTaskMutation } from '../../store/slices/tasks/tasksApi';
import { openUpdateTaskModal, setDataForUpdateTask } from '../../store/slices/tasks/tasksSlice';

type TaskPropsType = {
  task: TaskType;
  index: number;
};

export const Task: FC<TaskPropsType> = ({ task, index }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const [deleteTask, { isSuccess }] = useDeleteTaskMutation();
  const { contextDispatch } = useContext(Context);

  useEffect(() => {
    if (isSuccess) {
      toast.success(t('taskDeleted'));
    }
  }, [isSuccess, t]);

  const deleteTaskCb = async () => {
    const { boardId, columnId, _id: taskId } = task;
    await deleteTask({ boardId, columnId, taskId }).unwrap();
  };

  const onClickOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onClickEdit = () => {
    dispatch(setDataForUpdateTask(task));
    dispatch(openUpdateTaskModal());
    closeMenu();
  };
  const onClickDelete = () => {
    contextDispatch({ type: ReducerTypes.cb, payload: deleteTaskCb });
    closeMenu();
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Draggable key={task._id} draggableId={task._id} index={index}>
      {(provided) => (
        <Box {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <Card>
            <CardContent>
              <Box
                sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Typography level="h2" fontSize="lg">
                  {task.title}
                </Typography>
                <IconButton
                  variant="plain"
                  color="neutral"
                  size="sm"
                  sx={{ ml: 'auto' }}
                  aria-controls={isOpen ? 'task-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={isOpen ? 'true' : undefined}
                  onClick={onClickOpenMenu}
                >
                  <MoreIcon />
                </IconButton>

                <Menu id="task-menu" anchorEl={anchorEl} open={isOpen} onClose={closeMenu}>
                  <MenuItem onClick={onClickEdit}>{t('edit')}</MenuItem>
                  <MenuItem onClick={onClickDelete}>{t('delete')}</MenuItem>
                </Menu>
              </Box>
              <Box>
                <Typography>{task.description}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}
    </Draggable>
  );
};
