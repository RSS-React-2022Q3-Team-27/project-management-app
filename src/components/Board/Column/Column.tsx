import { Droppable, Draggable } from '@hello-pangea/dnd';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import Typography from '@mui/joy/Typography';
import { FC, useContext, useState } from 'react';

import styles from './column.module.css';

import { Context } from '../../../Context/Context';
import { ReducerTypes } from '../../../Context/contextReducer/ReducerTypes';
import { useAppDispatch } from '../../../store/hooks';

import {
  ColumnType,
  UpdateSetOfColumns,
  useDeleteColumnMutation,
  useUpdateSetOfColumnsMutation,
} from '../../../store/slices/board/boardApi';
import { TaskType } from '../../../store/slices/tasks/tasksApi';
import { openAddTaskModal, setDataForAddTask, setNewTaskOrder } from '../../../store/slices/tasks/tasksSlice';
import { Task } from '../../Task/Task';
import { ColumnTitleInput } from '../ColumnTitleInput';

type ColumnPropsType = {
  column: {
    columnData: ColumnType;
    tasksData: TaskType[];
  };
  columns: {
    columnData: ColumnType;
    tasksData: TaskType[];
  }[];
  boardIndex: number;
  tasksRefetch: () => void;
};

export const Column: FC<ColumnPropsType> = ({ column, columns, boardIndex, tasksRefetch }) => {
  const { title, boardId, _id: columnId, order } = column.columnData;
  const dispatch = useAppDispatch();
  const { contextDispatch } = useContext(Context);
  const [deleteColumn] = useDeleteColumnMutation();
  const [updateSetOfColumns] = useUpdateSetOfColumnsMutation();

  const [isInputActive, setInputActive] = useState(false);

  const handleDelete = async () => {
    await deleteColumn({ boardId, columnId }).unwrap();

    tasksRefetch();

    if (columns.length < 2) return;

    const newColumns = Array.from(columns);
    const columnsToUpdate: UpdateSetOfColumns[] = [];

    newColumns.splice(order, 1);
    newColumns.forEach((column, i) => columnsToUpdate.push({ _id: column.columnData._id, order: i }));

    await updateSetOfColumns(columnsToUpdate).unwrap();
  };

  const onClickDelete = async () => {
    contextDispatch({
      type: ReducerTypes.cb,
      payload: () => handleDelete(),
    });
  };

  const onClickAddTask = () => {
    console.log('order', column.tasksData.length);
    dispatch(setNewTaskOrder(column.tasksData.length));
    dispatch(setDataForAddTask({ boardId, columnId }));
    dispatch(openAddTaskModal());
  };

  const tasks = column.tasksData.map((task, index) => (
    <Task key={task._id} task={task} index={index} column={column} />
  ));

  return (
    <Draggable draggableId={columnId} index={boardIndex}>
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
              <ColumnTitleInput column={column.columnData} setInputActive={setInputActive} />
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
            <Droppable droppableId={columnId} type="tasks">
              {(provided) => (
                <List
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{ display: 'flex', flexDirection: 'column', mr: 1 }}
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
