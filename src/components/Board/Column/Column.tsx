import { Droppable, Draggable } from '@hello-pangea/dnd';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import Typography from '@mui/joy/Typography';
import { FC, useContext, useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import styles from './column.module.css';

import { Context } from '../../../Context/Context';
import { ReducerTypes } from '../../../Context/contextReducer/ReducerTypes';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import {
  ColumnType,
  UpdateSetOfColumns,
  useDeleteColumnMutation,
  useUpdateSetOfColumnsMutation,
} from '../../../store/slices/board/boardApi';
import { deleteColumnTasks, saveColumnTasks } from '../../../store/slices/board/boardSlice';
import { TaskType, useGetTasksByColumnIdQuery } from '../../../store/slices/tasks/tasksApi';
import { openAddTaskModal, setDataForAddTask } from '../../../store/slices/tasks/tasksSlice';
import { Task } from '../../Task/Task';
import { ColumnTitleInput } from '../ColumnTitleInput';

type ColumnPropsType = {
  column: ColumnType;
  columns: ColumnType[];
  boardIndex: number;
};

export const Column: FC<ColumnPropsType> = ({ column, columns, boardIndex }) => {
  const { title, boardId, _id: columnId } = column;
  const dispatch = useAppDispatch();
  const { contextDispatch } = useContext(Context);
  const [deleteColumn] = useDeleteColumnMutation();
  const [updateSetOfColumns] = useUpdateSetOfColumnsMutation();
  const { data, isError } = useGetTasksByColumnIdQuery({ boardId, columnId });
  const [tasksToRender, setTasksToRender] = useState<TaskType[]>([]);
  const { columnsData } = useAppSelector((state) => state.board);

  useEffect(() => {
    if (isError) {
      toast.error('Error');
    } else if (data) {
      dispatch(saveColumnTasks({ columnId: column._id, data }));
    }
  }, [column._id, data, dispatch, isError]);

  useEffect(() => {
    const tasks = columnsData[columnId];
    if (tasks) {
      setTasksToRender(tasks);
    }
  }, [columnId, columnsData]);

  const [isInputActive, setInputActive] = useState(false);

  const handleDelete = async () => {
    await deleteColumn({ boardId, columnId }).unwrap();

    const newColumns = Array.from(columns);
    const columnsToUpdate: UpdateSetOfColumns[] = [];

    newColumns.splice(column.order, 1);
    newColumns.forEach((column, i) => columnsToUpdate.push({ _id: column._id, order: i }));

    await updateSetOfColumns(columnsToUpdate).unwrap();

    dispatch(deleteColumnTasks(columnId));
  };

  const onClickDelete = async () => {
    contextDispatch({
      type: ReducerTypes.cb,
      payload: () => handleDelete(),
    });
  };

  const onClickAddTask = () => {
    dispatch(setDataForAddTask({ boardId, columnId }));
    dispatch(openAddTaskModal());
  };

  const tasks = tasksToRender?.map((task, index) => <Task key={task._id} task={task} index={index} />);

  return (
    <Draggable draggableId={column._id} index={boardIndex}>
      {(provided) => (
        <Box
          {...provided.draggableProps}
          ref={provided.innerRef}
          sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: 280, flexShrink: 0, height: '100%', mx: 1 }}
        >
          <Box
            {...provided.dragHandleProps}
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}
          >
            {isInputActive ? (
              <ColumnTitleInput column={column} setInputActive={setInputActive} />
            ) : (
              <>
                <Typography component="h3" level="h6" sx={{ width: '100%' }} onClick={() => setInputActive(true)}>
                  {title}
                </Typography>
                <IconButton variant="outlined" color="neutral" onClick={onClickDelete}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </Box>
          <Box className={styles.list} sx={{ overflowY: 'auto' }}>
            <Droppable droppableId={column._id} type="tasks">
              {(provided) => (
                <List
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1, mr: 1 }}
                >
                  {tasks}
                  {provided.placeholder}
                </List>
              )}
            </Droppable>
          </Box>
          <Button
            startDecorator={<AddRoundedIcon />}
            sx={{ width: 280 }}
            variant="outlined"
            color="primary"
            onClick={onClickAddTask}
          >
            Add task
          </Button>
        </Box>
      )}
    </Draggable>
  );
};
