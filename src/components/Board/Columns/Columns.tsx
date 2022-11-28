import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import CircularProgress from '@mui/joy/CircularProgress';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  ColumnType,
  useGetColumnsInBoardQuery,
  useUpdateSetOfColumnsMutation,
} from '../../../store/slices/board/boardApi';
import { openAddColumnModal, setColumnsLength } from '../../../store/slices/board/boardSlice';
import { useGetFilesByBoardIdQuery } from '../../../store/slices/files/filesApi';
import { CoversType, setCovers } from '../../../store/slices/files/filesSlice';
import { useGetPointsQuery } from '../../../store/slices/points/pointsApi';
import {
  TaskType,
  UpdateSetOfTaskType,
  useGetTasksByBoardIdQuery,
  useUpdateSetOfTasksMutation,
} from '../../../store/slices/tasks/tasksApi';
import { FileFakeId } from '../../../types/FileFakeId';
import { changeColumnsOrder, changeColumnsTasksOrder, changeTasksOrder } from '../../../utils/changeDataOrder';

import { Column } from '../Column';

type columnToRenderType = {
  [key: string]: {
    columnData: ColumnType;
    tasksData: TaskType[];
  };
};

export type fileType = {
  boardId: string;
  name: string;
  path: string;
  taskId: string;
  _id: string;
};

export type fileToRenderType = {
  [key: string]: fileType[];
};

export const Columns = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id?: string }>();
  const { data: columns, isError: isColumnsError, isLoading: isColumnsLoading } = useGetColumnsInBoardQuery(id || '');
  const { data: files, isError: isFilesError, isLoading: isFilesLoading } = useGetFilesByBoardIdQuery(id || '');
  const {
    data: covers,
    isError: isCoversError,
    isLoading: isCoversLoading,
  } = useGetFilesByBoardIdQuery(FileFakeId.cover);
  const {
    data: tasks,
    isError: isTasksError,
    refetch: tasksRefetch,
    isLoading: isTasksLoading,
  } = useGetTasksByBoardIdQuery(id || '');
  const [updateSetOfColumns] = useUpdateSetOfColumnsMutation();
  const [updateSetOfTasks] = useUpdateSetOfTasksMutation();
  const dispatch = useAppDispatch();
  const [columnsToRender, setColumnsToRender] = useState<columnToRenderType>({});
  const [filesToRender, setFilesToRender] = useState<fileToRenderType>({});
  const { id: userId } = useAppSelector((state) => state.user);
  const { data: points, isError: isPointsError, isLoading: isPointsLoading } = useGetPointsQuery(userId);

  useEffect(() => {
    if (isColumnsError || isTasksError || isFilesError || isCoversError || isPointsError) {
      toast.error('Error');
    } else if (columns) {
      const sortedColumns = [...columns].sort((a, b) => a.order - b.order);
      const dataToRender: columnToRenderType = {};
      const sortedFiles: fileToRenderType = {};
      const sortedCovers: CoversType = {};

      sortedColumns.forEach((column) => {
        dataToRender[column._id] = { columnData: column, tasksData: [] };
      });

      if (tasks && tasks.length) {
        tasks.forEach((task) => {
          const column = dataToRender[task.columnId];

          if (column) {
            column.tasksData[task.order] = task;
          }
        });
      }

      if (files && files.length) {
        files.forEach((file) => {
          const task = sortedFiles[file.taskId];
          if (task) {
            sortedFiles[file.taskId].push(file);
          } else {
            sortedFiles[file.taskId] = [];
            sortedFiles[file.taskId].push(file);
          }
        });
      }

      if (covers && covers.length) {
        covers.forEach((cover) => {
          sortedCovers[cover.taskId] = { path: cover.path, coverId: cover._id, name: cover.name };
        });
      }

      dispatch(setCovers(sortedCovers));

      setFilesToRender(sortedFiles);
      setColumnsToRender(dataToRender);
    }
  }, [
    columns,
    covers,
    dispatch,
    files,
    isColumnsError,
    isCoversError,
    isFilesError,
    isTasksError,
    isPointsError,
    tasks,
  ]);

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
      const { columnsToUpdate, dataToRender } = changeColumnsOrder(columnsToRender, source.index, destination.index);

      setColumnsToRender(dataToRender);
      await updateSetOfColumns(columnsToUpdate).unwrap();

      return;
    }

    const startColumnId = source.droppableId;
    const endColumnId = destination.droppableId;

    if (startColumnId === endColumnId) {
      const { updatedTasks, setOfTasks } = changeTasksOrder(
        columnsToRender,
        startColumnId,
        source.index,
        destination.index
      );

      setColumnsToRender((data) => {
        data[startColumnId].tasksData = [...updatedTasks];

        return data;
      });

      await updateSetOfTasks(setOfTasks).unwrap();

      return;
    }

    if (startColumnId !== endColumnId) {
      const { startTasks, finishTasks, startSetOfTasks, finishSetOfTasks } = changeColumnsTasksOrder(
        columnsToRender,
        startColumnId,
        endColumnId,
        source.index,
        destination.index
      );

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
      files={filesToRender}
      points={points ?? []}
    />
  ));

  return (
    <>
      {isColumnsLoading || isTasksLoading || isFilesLoading || isCoversLoading || isPointsLoading ? (
        <CircularProgress sx={{ mx: 'auto', mt: 10 }} />
      ) : (
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
      )}
    </>
  );
};
