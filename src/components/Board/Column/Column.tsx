import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import { FC, useContext } from 'react';

import { Context } from '../../../Context/Context';
import { ReducerTypes } from '../../../Context/contextReducer/ReducerTypes';
import { useAppDispatch } from '../../../store/hooks';

import { ColumnType, useDeleteColumnMutation } from '../../../store/slices/board/boardApi';
import { useGetTasksByColumnIdQuery } from '../../../store/slices/tasks/tasksApi';
import { openAddTaskModal, setDataForAddTask } from '../../../store/slices/tasks/tasksSlice';

type ColumnPropsType = {
  column: ColumnType;
};

export const Column: FC<ColumnPropsType> = ({ column }) => {
  const { title, boardId, _id: columnId } = column;
  const dispatch = useAppDispatch();
  const { contextDispatch } = useContext(Context);
  const [deleteColumn] = useDeleteColumnMutation();
  const { data } = useGetTasksByColumnIdQuery({ boardId, columnId });

  const tasks = data?.map((task) => <pre key={task._id}>{task.title}</pre>);

  const onClickDelete = async () => {
    contextDispatch({
      type: ReducerTypes.cb,
      payload: () => deleteColumn({ boardId, columnId }).unwrap(),
    });
  };

  const onClickAddTask = () => {
    dispatch(setDataForAddTask({ boardId, columnId }));
    dispatch(openAddTaskModal());
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: 260, flexShrink: 0, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography component="h3" level="h6">
          {title}
        </Typography>
        <IconButton variant="outlined" color="neutral">
          <DeleteIcon onClick={onClickDelete} />
        </IconButton>
      </Box>
      <Box sx={{ height: '100%', border: 1, borderColor: 'grey.200', borderRadius: 8 }}>
        {tasks}
        <Button
          startDecorator={<AddRoundedIcon />}
          sx={{ width: 260 }}
          variant="outlined"
          color="neutral"
          onClick={onClickAddTask}
        >
          Add task
        </Button>
      </Box>
    </Box>
  );
};
