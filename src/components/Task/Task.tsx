import { Draggable } from '@hello-pangea/dnd';
import MoreIcon from '@mui/icons-material/MoreHoriz';
import { Card, CardContent, Typography, IconButton, Menu, MenuItem } from '@mui/joy';
import Box from '@mui/joy/Box';
import { FC, useState } from 'react';

import { TaskType } from '../../store/slices/tasks/tasksApi';

type TaskPropsType = {
  task: TaskType;
  index: number;
};

export const Task: FC<TaskPropsType> = ({ task, index }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const onClickOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onClickEdit = () => {
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
                  <MenuItem onClick={onClickEdit}>Edit</MenuItem>
                  <MenuItem onClick={onClickDelete}>Delete</MenuItem>
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
