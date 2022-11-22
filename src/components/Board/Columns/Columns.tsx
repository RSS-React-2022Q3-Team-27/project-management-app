import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAppDispatch } from '../../../store/hooks';

import {
  ColumnType,
  UpdateSetOfColumns,
  useGetColumnsInBoardQuery,
  useUpdateSetOfColumnsMutation,
} from '../../../store/slices/board/boardApi';
import { openAddColumnModal, setColumnsLength } from '../../../store/slices/board/boardSlice';
import {
  TaskType,
  UpdateSetOfTaskType,
  useGetTasksByBoardIdQuery,
  useUpdateSetOfTasksMutation,
} from '../../../store/slices/tasks/tasksApi';
import { Column } from '../Column';

type columnToRenderType = {
  [key: string]: {
    columnData: ColumnType;
    tasksData: TaskType[];
  };
};

export const Columns = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id?: string }>();
  const { data: columns, isError: isColumnsError } = useGetColumnsInBoardQuery(id || '');
  const { data: tasks, isError: isTasksError, refetch: tasksRefetch } = useGetTasksByBoardIdQuery(id || '');
  const [updateSetOfColumns] = useUpdateSetOfColumnsMutation();
  const [updateSetOfTasks] = useUpdateSetOfTasksMutation();
  const dispatch = useAppDispatch();
  const [columnsToRender, setColumnsToRender] = useState<columnToRenderType>({});

  useEffect(() => {
    if (isColumnsError || isTasksError) {
      toast.error('Error');
    } else if (columns) {
      const sortedColumns = [...columns].sort((a, b) => a.order - b.order);
      const dataToRender: columnToRenderType = {};

      sortedColumns.forEach((column) => {
        dataToRender[column._id] = { columnData: column, tasksData: [] };
      });

      console.log('tasks', tasks);

      if (tasks && tasks.length) {
        console.log('tasks', JSON.stringify(tasks));
        tasks.forEach((task) => {
          const place = dataToRender[task.columnId];
          console.log('tasksData', JSON.stringify(place.tasksData));
          place.tasksData[task.order] = task;
        });
      }

      console.log(dataToRender);

      setColumnsToRender(dataToRender);
    }
  }, [columns, isColumnsError, isTasksError, tasks]);

  const handleClick = () => {
    dispatch(openAddColumnModal());
    dispatch(setColumnsLength(columns?.length));
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
      const updatedColumns = Array.from([...Object.values(columnsToRender)]);
      const movedColumn = updatedColumns.splice(source.index, 1);
      const columnsToUpdate: UpdateSetOfColumns[] = [];

      updatedColumns.splice(destination.index, 0, ...movedColumn);

      const dataToRender: columnToRenderType = {};

      updatedColumns.forEach((column, i) => {
        columnsToUpdate.push({ _id: column.columnData._id, order: i });
        dataToRender[column.columnData._id] = {
          columnData: { ...column.columnData, order: i },
          tasksData: column.tasksData,
        };

        return { ...column, column: { ...column.columnData, order: i } };
      });

      setColumnsToRender(dataToRender);

      await updateSetOfColumns(columnsToUpdate).unwrap();

      return;
    }

    const startColumnId = source.droppableId;
    const endColumnId = destination.droppableId;

    if (startColumnId === endColumnId) {
      const tasks: TaskType[] = Array.from(columnsToRender[startColumnId].tasksData);
      const movedTask = tasks.splice(source.index, 1);
      const setOfTasks: UpdateSetOfTaskType = [];
      console.log('task', tasks);

      tasks.splice(destination.index, 0, ...movedTask);
      tasks.forEach((task, i) => {
        setOfTasks.push({ _id: task._id, order: i, columnId: startColumnId });

        return { ...task, order: i };
      });

      setColumnsToRender((data) => {
        data[startColumnId].tasksData = [...tasks];

        return data;
      });

      await updateSetOfTasks(setOfTasks).unwrap();

      return;
    }

    if (startColumnId !== endColumnId) {
      const startTasks: TaskType[] = Array.from(columnsToRender[startColumnId].tasksData);
      const finishTasks: TaskType[] = Array.from(columnsToRender[endColumnId].tasksData);
      const movedTask = startTasks.splice(source.index, 1);
      const startSetOfTasks: UpdateSetOfTaskType = [];
      const finishSetOfTasks: UpdateSetOfTaskType = [];

      startTasks.forEach((task, i) => {
        startSetOfTasks.push({ _id: task._id, order: i, columnId: startColumnId });

        return { ...task, order: i };
      });

      finishTasks.splice(destination.index, 0, ...movedTask);
      finishTasks.forEach((task, i) => {
        finishSetOfTasks.push({ _id: task._id, order: i, columnId: endColumnId });

        return { ...task, order: i, columnId: endColumnId };
      });

      setColumnsToRender((data) => {
        data[startColumnId].tasksData = [...startTasks];
        data[endColumnId].tasksData = [...finishTasks];

        return data;
      });

      const setOfTasks: UpdateSetOfTaskType = [...startSetOfTasks, ...finishSetOfTasks];

      await updateSetOfTasks(setOfTasks).unwrap();

      return;
    }
  };

  const boardColumns = [...Object.values(columnsToRender)].map((data, i) => (
    <Column
      key={data.columnData._id}
      column={data}
      columns={[...Object.values(columnsToRender)]}
      boardIndex={i}
      tasksRefetch={tasksRefetch}
    />
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
