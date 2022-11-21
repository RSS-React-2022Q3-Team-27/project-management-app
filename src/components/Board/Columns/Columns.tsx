import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import {
  ColumnType,
  UpdateSetOfColumns,
  useGetColumnsInBoardQuery,
  useUpdateSetOfColumnsMutation,
} from '../../../store/slices/board/boardApi';
import { openAddColumnModal, saveColumnTasks, setColumnsLength } from '../../../store/slices/board/boardSlice';
import { TaskType, UpdateSetOfTaskType, useUpdateSetOfTasksMutation } from '../../../store/slices/tasks/tasksApi';
import { Column } from '../Column';

export const Columns = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id?: string }>();
  const { data, isError } = useGetColumnsInBoardQuery(id || '');
  const [updateSetOfColumns] = useUpdateSetOfColumnsMutation();
  const [updateSetOfTasks] = useUpdateSetOfTasksMutation();
  const dispatch = useAppDispatch();
  const { columnsData } = useAppSelector((state) => state.board);
  const [columnsToRender, setColumnsToRender] = useState<ColumnType[]>([]);

  useEffect(() => {
    if (isError) {
      toast.error('Error');
    } else if (data) {
      setColumnsToRender([...data].sort((a, b) => a.order - b.order));
    }
  }, [data, isError]);

  const handleClick = () => {
    dispatch(openAddColumnModal());
    dispatch(setColumnsLength(data?.length));
  };

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'column') {
      const updatedColumns = Array.from(columnsToRender);
      const movedColumn = updatedColumns.splice(source.index, 1);
      const columnsToUpdate: UpdateSetOfColumns[] = [];

      updatedColumns.splice(destination.index, 0, ...movedColumn);

      updatedColumns.forEach((column, i) => {
        columnsToUpdate.push({ _id: column._id, order: i });

        return { ...column, order: i };
      });

      setColumnsToRender(updatedColumns);

      await updateSetOfColumns(columnsToUpdate).unwrap();

      return;
    }

    const startColumnId = source.droppableId;
    const endColumnId = destination.droppableId;

    if (startColumnId === endColumnId) {
      const tasks: TaskType[] = Array.from(columnsData[startColumnId]);
      const movedTask = tasks.splice(source.index, 1);

      tasks.splice(destination.index, 0, ...movedTask);
      tasks.forEach((task, i) => (tasks[i] = { ...task, order: i }));

      dispatch(saveColumnTasks({ columnId: startColumnId, data: tasks }));

      const setOfTasks: UpdateSetOfTaskType = tasks.map((task) => {
        const { _id, order, columnId } = task;
        return { _id, order, columnId };
      });
      await updateSetOfTasks(setOfTasks).unwrap();

      return;
    }

    if (startColumnId !== endColumnId) {
      const startTasks: TaskType[] = Array.from(columnsData[startColumnId]);
      const finishTasks: TaskType[] = Array.from(columnsData[endColumnId]);
      const movedTask = startTasks.splice(source.index, 1);

      startTasks.forEach((task, i) => (startTasks[i] = { ...task, order: i }));

      finishTasks.splice(destination.index, 0, ...movedTask);
      finishTasks.forEach((task, i) => (finishTasks[i] = { ...task, order: i, columnId: endColumnId }));

      dispatch(saveColumnTasks({ columnId: startColumnId, data: startTasks }));
      dispatch(saveColumnTasks({ columnId: endColumnId, data: finishTasks }));

      const startSetOfTasks: UpdateSetOfTaskType = startTasks.map((task) => {
        const { _id, order, columnId } = task;
        return { _id, order, columnId };
      });
      const finishSetOfTasks: UpdateSetOfTaskType = finishTasks.map((task) => {
        const { _id, order, columnId } = task;
        return { _id, order, columnId };
      });

      const setOfTasks: UpdateSetOfTaskType = [...startSetOfTasks, ...finishSetOfTasks];

      await updateSetOfTasks(setOfTasks).unwrap();

      return;
    }
  };

  const boardColumns = [...columnsToRender].map((column, i) => (
    <Column key={column._id} column={column} columns={columnsToRender} boardIndex={i} />
  ));

  return (
    <>
      <Box sx={{ flexGrow: 1, position: 'relative' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            overflowX: 'auto',
            position: 'absolute',
            gap: 2,
            inset: 0,
            pr: 2,
            py: 2,
          }}
        >
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="all-columns" direction="horizontal" type="column">
              {(provided) => (
                <Box {...provided.droppableProps} ref={provided.innerRef} sx={{ display: 'flex', height: '100%' }}>
                  {boardColumns}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
          <Button
            variant="plain"
            color="neutral"
            startDecorator={<AddRoundedIcon />}
            sx={{ width: 260, flexShrink: 0 }}
            onClick={handleClick}
          >
            {t('newColumn')}
          </Button>
        </Box>
      </Box>
    </>
  );
};
