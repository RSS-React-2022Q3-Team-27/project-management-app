import { Draggable } from '@hello-pangea/dnd';
import MoreIcon from '@mui/icons-material/MoreHoriz';
import { Card, CardContent, Typography, IconButton, Menu, MenuItem } from '@mui/joy';
import Box from '@mui/joy/Box';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '../../store/hooks';

import { TaskType } from '../../store/slices/tasks/tasksApi';
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

  const onClickOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onClickEdit = () => {
    dispatch(setDataForUpdateTask(task));
    dispatch(openUpdateTaskModal());
    closeMenu();
  };
  const onClickDelete = () => {
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
