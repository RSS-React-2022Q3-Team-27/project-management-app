import { Card, CardContent, Typography } from '@mui/joy';
import Box from '@mui/joy/Box';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../../../constants/routes';

import { TaskType } from '../../../../store/slices/tasks/tasksApi';

type TaskPropsType = {
  task: TaskType;
};

export const ProfileTask = ({ task }: TaskPropsType) => {
  return (
    <Link
      to={`${ROUTES.BOARD.path}/${task.boardId}`}
      style={{ textDecoration: 'none', width: '100%', flexShrink: 0, cursor: 'pointer' }}
    >
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography level="h2" fontSize="lg">
              {task.title}
            </Typography>
          </Box>
          <Box>
            <Typography>{task.description}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};
