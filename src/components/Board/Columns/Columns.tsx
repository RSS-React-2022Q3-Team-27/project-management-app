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
import { openAddColumnModal, setColumnsLength } from '../../../store/slices/board/boardSlice';
import { TaskType } from '../../../store/slices/tasks/tasksApi';
import { Column } from '../Column';

export const Columns = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id?: string }>();
  const { data, isError } = useGetColumnsInBoardQuery(id || '');
  const [updateSetOfColumns] = useUpdateSetOfColumnsMutation();
  const dispatch = useAppDispatch();
  const { columnsData } = useAppSelector((state) => state.board);
  const [dataToRender, setDataToRender] = useState<ColumnType[]>([]);

  useEffect(() => {
    if (isError) {
      toast.error('Error');
    } else if (data) {
      setDataToRender([...data].sort((a, b) => a.order - b.order));
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
      const updatedColumns = Array.from(dataToRender);
      const movedColumn = updatedColumns.splice(source.index, 1);
      const columnsToUpdate: UpdateSetOfColumns[] = [];

      updatedColumns.splice(destination.index, 0, ...movedColumn);

      updatedColumns.forEach((column, i) => {
        columnsToUpdate.push({ _id: column._id, order: i });

        return { ...column, order: i };
      });

      setDataToRender(updatedColumns);

      await updateSetOfColumns(columnsToUpdate).unwrap();

      return;
    }

    const startColumnId = source.droppableId;
    const endColumnId = destination.droppableId;

    if (startColumnId === endColumnId) {
      const newTasks: TaskType[] = Array.from(columnsData[startColumnId]);
      const movedTask = newTasks.splice(source.index, 1);

      newTasks.splice(destination.index, 0, ...movedTask);
      newTasks.forEach((task, i) => (newTasks[i] = { ...task, order: i }));

      // console.log(columnsData[startColumnId]);
      // console.log(newTasks);
      //make request to update newTasks set
      return;
    }

    const startTasks: TaskType[] = Array.from(columnsData[startColumnId]);
    // const movedTask = startTasks.splice(source.index, 1);
    startTasks.forEach((task, i) => (startTasks[i] = { ...task, order: i }));

    //get Tasks by endColumnId
    //finishTasks = Array.from(Tasks)
    //finishTasks.splice(destination.index, 0, ...movedTask);
    //finishTasks.forEach((task, i) => (finishTasks[i] = { ...task, order: i }));
    //make request to update [startTasks, finishTasks] set
  };

  const boardColumns = [...dataToRender].map((column, i) => (
    <Column key={column._id} column={column} columns={dataToRender} boardIndex={i} />
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
