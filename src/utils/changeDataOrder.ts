import { ColumnType, UpdateSetOfColumns } from '../store/slices/board/boardApi';
import { TaskType, UpdateSetOfTaskType } from '../store/slices/tasks/tasksApi';

type columnToRenderType = {
  [key: string]: {
    columnData: ColumnType;
    tasksData: TaskType[];
  };
};

export const changeColumnsOrder = (columnList: columnToRenderType, startIndex: number, endIndex: number) => {
  const updatedColumns = Array.from([...Object.values(columnList)]);
  const movedColumn = updatedColumns.splice(startIndex, 1);
  const columnsToUpdate: UpdateSetOfColumns[] = [];

  updatedColumns.splice(endIndex, 0, ...movedColumn);

  const dataToRender: columnToRenderType = {};

  updatedColumns.forEach((column, i) => {
    columnsToUpdate.push({ _id: column.columnData._id, order: i });
    dataToRender[column.columnData._id] = {
      columnData: { ...column.columnData, order: i },
      tasksData: column.tasksData,
    };

    return { ...column, column: { ...column.columnData, order: i } };
  });

  return { columnsToUpdate, dataToRender };
};

export const changeTasksOrder = (
  columnList: columnToRenderType,
  columnId: string,
  startIndex: number,
  endIndex: number
) => {
  const updatedTasks: TaskType[] = Array.from(columnList[columnId].tasksData).filter(Boolean);
  const movedTask = updatedTasks.splice(startIndex, 1);
  const setOfTasks: UpdateSetOfTaskType = [];

  updatedTasks.splice(endIndex, 0, ...movedTask);
  updatedTasks.forEach((task, i) => {
    setOfTasks.push({ _id: task._id, order: i, columnId: columnId });

    return { ...task, order: i };
  });

  return { updatedTasks, setOfTasks };
};

export const changeColumnsTasksOrder = (
  columnList: columnToRenderType,
  startColumnId: string,
  endColumnId: string,
  startIndex: number,
  endIndex: number
) => {
  const startTasks: TaskType[] = Array.from(columnList[startColumnId].tasksData).filter(Boolean);
  const finishTasks: TaskType[] = Array.from(columnList[endColumnId].tasksData).filter(Boolean);
  const movedTask = startTasks.splice(startIndex, 1);
  const startSetOfTasks: UpdateSetOfTaskType = [];
  const finishSetOfTasks: UpdateSetOfTaskType = [];

  startTasks.forEach((task, i) => {
    startSetOfTasks.push({ _id: task._id, order: i, columnId: startColumnId });

    return { ...task, order: i };
  });

  finishTasks.splice(endIndex, 0, ...movedTask);
  finishTasks.forEach((task, i) => {
    finishSetOfTasks.push({ _id: task._id, order: i, columnId: endColumnId });

    return { ...task, order: i, columnId: endColumnId };
  });

  return { startTasks, finishTasks, startSetOfTasks, finishSetOfTasks };
};
