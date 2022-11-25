import { Draggable } from '@hello-pangea/dnd';
import MoreIcon from '@mui/icons-material/MoreHoriz';
import { Card, CardContent, Typography, IconButton, Menu, MenuItem } from '@mui/joy';
import Box from '@mui/joy/Box';
import List from '@mui/material/List';
import { FC, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { FileAttachment } from './FileAttachment';

import { Context } from '../../Context/Context';

import { ReducerTypes } from '../../Context/contextReducer/ReducerTypes';

import { useAppDispatch } from '../../store/hooks';
import { ColumnType } from '../../store/slices/board/boardApi';
import { openAddFileModal } from '../../store/slices/files/filesSlice';

import {
  TaskType,
  UpdateSetOfTaskType,
  useDeleteTaskMutation,
  useUpdateSetOfTasksMutation,
} from '../../store/slices/tasks/tasksApi';
import { openUpdateTaskModal, setDataForUpdateTask } from '../../store/slices/tasks/tasksSlice';
import { fileType } from '../Board/Columns/Columns';

type TaskPropsType = {
  task: TaskType;
  index: number;
  column: {
    columnData: ColumnType;
    tasksData: TaskType[];
  };
  files: fileType[];
};

export const Task: FC<TaskPropsType> = ({ task, index, column, files }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const [deleteTask, { isSuccess }] = useDeleteTaskMutation();
  const [updateSetOfTasks] = useUpdateSetOfTasksMutation();
  const { contextDispatch } = useContext(Context);

  useEffect(() => {
    if (isSuccess) {
      toast.success(t('taskDeleted'));
    }
    console.log(files);
  }, [files, isSuccess, t]);

  const deleteTaskCb = async () => {
    const { boardId, columnId, _id: taskId, order } = task;

    await deleteTask({ boardId, columnId, taskId }).unwrap();

    const tasks = Array.from(column.tasksData);

    const setOfTasks: UpdateSetOfTaskType = [];

    tasks.splice(order, 1);
    tasks.forEach((taskData, i) => {
      setOfTasks.push({ _id: taskData._id, columnId: taskData.columnId, order: i });
    });

    await updateSetOfTasks(setOfTasks).unwrap();
  };

  const onClickOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onClickEdit = () => {
    dispatch(setDataForUpdateTask(task));
    dispatch(openUpdateTaskModal());
    closeMenu();
  };
  const onClickDelete = () => {
    contextDispatch({ type: ReducerTypes.cb, payload: deleteTaskCb });
    closeMenu();
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };
  const onClickAddFile = () => {
    dispatch(openAddFileModal({ taskId: task._id, boardId: task.boardId }));
    closeMenu();
  };

  return (
    <Draggable key={task._id} draggableId={task._id} index={index}>
      {(provided) => (
        <Box {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <Card sx={{ my: 0.5 }}>
            <CardContent>
              <Box
                sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Typography level="h2" fontSize="lg">
                  {task.title}
                </Typography>
                <IconButton
                  variant="plain"
                  color="neutral"
                  size="sm"
                  sx={{ ml: 'auto' }}
                  aria-controls={isOpen ? 'task-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={isOpen ? 'true' : undefined}
                  onClick={onClickOpenMenu}
                >
                  <MoreIcon />
                </IconButton>

                <Menu id="task-menu" anchorEl={anchorEl} open={isOpen} onClose={closeMenu}>
                  <MenuItem onClick={onClickEdit}>{t('edit')}</MenuItem>
                  <MenuItem onClick={onClickDelete}>{t('delete')}</MenuItem>
                  <MenuItem onClick={onClickAddFile}>{t('addFile')}</MenuItem>
                </Menu>
              </Box>
              <Box>
                <Typography>{task.description}</Typography>
              </Box>

              {files.length && (
                <List>
                  {files.map((file) => (
                    <FileAttachment key={file._id} name={file.name} path={file.path} />
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Box>
      )}
    </Draggable>
  );
};
