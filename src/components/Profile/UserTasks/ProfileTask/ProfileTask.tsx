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
<<<<<<< HEAD
      style={{ textDecoration: 'none', width: '280px', flexShrink: 0, cursor: 'pointer' }}
=======
      style={{ textDecoration: 'none', maxWidth: '280px', flexShrink: 0, cursor: 'pointer' }}
>>>>>>> 6499c1d83595c9d57c7c76b51b720101a1affdca
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
