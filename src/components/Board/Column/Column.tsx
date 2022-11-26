import { Droppable, Draggable } from '@hello-pangea/dnd';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import Typography from '@mui/joy/Typography';
import React, { FC, useContext, useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
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
import { setTitleEditId } from '../../../store/slices/board/boardSlice';
import { TaskType } from '../../../store/slices/tasks/tasksApi';
import { openAddTaskModal, setDataForAddTask, setNewTaskOrder } from '../../../store/slices/tasks/tasksSlice';
import { Task } from '../../Task/Task';
import { fileToRenderType } from '../Columns/Columns';
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
  files: fileToRenderType;
};

export const Column: FC<ColumnPropsType> = ({ column, columns, boardIndex, tasksRefetch, files }) => {
  const { title, boardId, _id: columnId, order } = column.columnData;
  const dispatch = useAppDispatch();
  const { contextDispatch } = useContext(Context);
  const [deleteColumn, { isSuccess }] = useDeleteColumnMutation();
  const [updateSetOfColumns] = useUpdateSetOfColumnsMutation();
  const { titleEditId } = useAppSelector((state) => state.board);
  const { t } = useTranslation();

  const [isInputActive, setInputActive] = useState(false);

  useEffect(() => {
    if (titleEditId === columnId) {
      setInputActive(true);
    } else {
      setInputActive(false);
    }
  }, [titleEditId, columnId]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(t('columnDeleted'));
    }
  }, [isSuccess, t]);

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
    dispatch(setNewTaskOrder(column.tasksData.length));
    dispatch(setDataForAddTask({ boardId, columnId }));
    dispatch(openAddTaskModal());
  };

  const tasks = column.tasksData.map((task, index) => (
    <Task key={task._id} task={task} index={index} column={column} files={files[task._id] ? files[task._id] : []} />
  ));

  return (
    <Draggable draggableId={columnId} index={boardIndex}>
      {(provided) => (
        <Box
          {...provided.draggableProps}
          ref={provided.innerRef}
          sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: 280, flexShrink: 0, height: '100%', mx: 1 }}
          onMouseDown={() => dispatch(setTitleEditId(null))}
        >
          <Box
            {...provided.dragHandleProps}
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}
          >
            {isInputActive ? (
              <ColumnTitleInput column={column.columnData} />
            ) : (
              <>
                <Typography
                  component="h3"
                  level="h6"
                  sx={{ width: '100%' }}
                  onClick={(e: React.SyntheticEvent) => {
                    e.stopPropagation();
                    dispatch(setTitleEditId(columnId));
                  }}
                >
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
                  sx={{ display: 'flex', flexDirection: 'column', minHeight: 20, p: 0 }}
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
