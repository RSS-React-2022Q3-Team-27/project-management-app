import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { FC } from 'react';

import { useAppSelector } from '../../../../../store/hooks';
import { TaskType } from '../../../../../store/slices/tasks/tasksApi';

type AccordionPropsType = {
  boardId: string;
  board: TaskType[];
};

export const AccordionBoard: FC<AccordionPropsType> = ({ boardId, board }) => {
  const { boards } = useAppSelector((state) => state.boards);

  const boardTitle = boards.find((board) => board._id === boardId)?.title ?? '???';
  const boardDescription = boards.find((board) => board._id === boardId)?.description ?? '???';

  const tasks = board.map((task) => (
    <Card key={task._id} sx={{ minWidth: 280, minHeight: 280 }}>
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
  ));

  return (
    <Accordion disableGutters>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Stack spacing={1}>
          <Typography>{boardTitle}</Typography>
          <Typography>{boardDescription}</Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails
        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}
      >
        {tasks}
      </AccordionDetails>
    </Accordion>
  );
};
