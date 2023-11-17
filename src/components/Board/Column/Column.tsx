import { Droppable, Draggable } from '@hello-pangea/dnd';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
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
import { IPointsResponse } from '../../../store/slices/points/pointsApi';
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
  points: IPointsResponse[];
};

export const Column: FC<ColumnPropsType> = ({ column, columns, boardIndex, tasksRefetch, files, points }) => {
  const { title, boardId, _id: columnId, order } = column.columnData;
  const dispatch = useAppDispatch();
  const { contextDispatch } = useContext(Context);
  const [deleteColumn] = useDeleteColumnMutation();
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

  const handleDelete = async () => {
    await deleteColumn({ boardId, columnId })
      .unwrap()
      .then(() => toast.success(t('columnDeleted')))
      .catch(() => toast.error(t('serverError')));

    tasksRefetch();

    const newColumns = Array.from(columns);
    const columnsToUpdate: UpdateSetOfColumns[] = [];

    newColumns.splice(order, 1);
    newColumns.forEach((column, i) => columnsToUpdate.push({ _id: column.columnData._id, order: i }));

    if (columnsToUpdate.length) {
      await updateSetOfColumns(columnsToUpdate)
        .unwrap()
        .catch(() => toast.error(t('serverError')));
    }
  };

  const onClickDelete = async () => {
    contextDispatch({
      type: ReducerTypes.onConfirmAction,
      payload: () => handleDelete(),
    });
  };

  const onClickAddTask = () => {
    dispatch(setNewTaskOrder(column.tasksData.length));
    dispatch(setDataForAddTask({ boardId, columnId }));
    dispatch(openAddTaskModal());
  };

  const tasks = column.tasksData.map((task, index) =>
    task ? (
      <Task
        key={task._id}
        task={task}
        index={index}
        column={column}
        files={files[task._id] ? files[task._id] : []}
        points={points ? points.filter((point) => point.taskId === task._id) : []}
      />
    ) : (
      ' '
    )
  );

  return (
    <Draggable draggableId={columnId} index={boardIndex}>
      {(provided) => (
        <Box
          {...provided.draggableProps}
          ref={provided.innerRef}
          sx={{
            width: 280,
            height: '100%',
            mx: 1,
          }}
          onMouseDown={() => dispatch(setTitleEditId(null))}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              maxHeight: '100%',
              borderRadius: 'sm',
              bgcolor: 'background.level2',
              p: 1,
            }}
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
                    sx={{ width: 224, pl: 1, wordBreak: 'break-word' }}
                    onClick={(e: React.SyntheticEvent) => {
                      e.stopPropagation();
                      dispatch(setTitleEditId(columnId));
                    }}
                  >
                    {title}
                  </Typography>
                  <IconButton variant="outlined" color="neutral" size="sm" onClick={onClickDelete}>
                    <ClearRoundedIcon />
                  </IconButton>
                </>
              )}
            </Box>
            <Box className={styles.list} sx={{ overflowY: 'auto' }}>
              <Droppable droppableId={columnId} type="tasks">
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      minHeight: 60,
                      p: 0,
                      outline: tasks.length ? 'none' : '1px dashed var(--joy-palette-neutral-outlinedBorder)',
                      outlineOffset: -1,
                      borderRadius: tasks.length ? 'none' : 'md',
                      // my: tasks.length ? 0 : '4px',
                    }}
                  >
                    {tasks}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </Box>
            <Button
              startDecorator={<AddRoundedIcon color="primary" />}
              sx={{ width: '100%' }}
              variant="outlined"
              color="neutral"
              onClick={onClickAddTask}
            >
              {t('addTask')}
            </Button>
          </Box>
        </Box>
      )}
    </Draggable>
  );
};
