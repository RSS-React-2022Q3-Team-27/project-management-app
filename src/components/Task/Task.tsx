import { Draggable } from '@hello-pangea/dnd';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import HideImageOutlinedIcon from '@mui/icons-material/HideImageOutlined';
import MoreIcon from '@mui/icons-material/MoreVert';
import WallpaperOutlinedIcon from '@mui/icons-material/WallpaperOutlined';
import {
  Card,
  CardContent,
  Typography,
  IconButton as IconButtonJoy,
  Menu,
  MenuItem,
  ListItemDecorator,
} from '@mui/joy';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { FC, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { FileAttachment } from './FileAttachment';

import { URL } from '../../constants/URL';

import { Context } from '../../Context/Context';

import { ReducerTypes } from '../../Context/contextReducer/ReducerTypes';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ColumnType } from '../../store/slices/board/boardApi';
import { useDeleteFileMutation } from '../../store/slices/files/filesApi';
import { openAddFileModal } from '../../store/slices/files/filesSlice';

import { IPointsResponse } from '../../store/slices/points/pointsApi';
import {
  TaskType,
  UpdateSetOfTaskType,
  useDeleteTaskMutation,
  useUpdateSetOfTasksMutation,
} from '../../store/slices/tasks/tasksApi';
import { openUpdateTaskModal, setDataForUpdateTask } from '../../store/slices/tasks/tasksSlice';
import { FileFakeId } from '../../types/FileFakeId';
import { fileType } from '../Board/Columns/Columns';
import { Points } from '../Points/Points';

type TaskPropsType = {
  task: TaskType;
  index: number;
  column: {
    columnData: ColumnType;
    tasksData: TaskType[];
  };
  files: fileType[];
  points: IPointsResponse[];
};

export const Task: FC<TaskPropsType> = ({ task, index, column, files, points }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isPoints, setIsPoints] = useState(false);
  const isOpen = Boolean(anchorEl);
  const [deleteTask] = useDeleteTaskMutation();
  const [updateSetOfTasks] = useUpdateSetOfTasksMutation();
  const { contextDispatch } = useContext(Context);
  const [expanded, setExpanded] = useState(false);
  const [deleteFile] = useDeleteFileMutation();
  const { covers } = useAppSelector((state) => state.files);

  const deleteTaskCb = async () => {
    const { boardId, columnId, _id: taskId, order } = task;
    await deleteTask({ boardId, columnId, taskId })
      .unwrap()
      .then(() => toast.success(t('taskDeleted')))
      .catch(() => toast.error(t('serverError')));

    const tasks = Array.from(column.tasksData);

    const setOfTasks: UpdateSetOfTaskType = [];

    tasks.splice(order, 1);
    tasks.forEach((taskData, i) => {
      setOfTasks.push({ _id: taskData._id, columnId: taskData.columnId, order: i });
    });

    if (setOfTasks.length) {
      await updateSetOfTasks(setOfTasks)
        .unwrap()
        .catch(() => toast.error(t('serverError')));
    }
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
    contextDispatch({ type: ReducerTypes.onConfirmAction, payload: deleteTaskCb });
    closeMenu();
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  const onClickAddPoints = () => {
    setIsPoints(true);
    closeMenu();
  };

  const onClickAddFile = () => {
    dispatch(
      openAddFileModal({
        taskId: task._id,
        boardId: task.boardId,
        files: files,
        cover: covers[task._id] ? covers[task._id].name : null,
        isCover: false,
        coverId: '',
      })
    );
    closeMenu();
  };

  const handleDeleteFile = async () => {
    await deleteFile(covers[task._id].coverId)
      .unwrap()
      .catch(() => toast.error(t('serverError')));
  };

  const onClickAddCover = () => {
    dispatch(
      openAddFileModal({
        taskId: task._id,
        boardId: FileFakeId.cover,
        files: files,
        cover: covers[task._id] ? covers[task._id].name : null,
        isCover: true,
        coverId: covers[task._id]?.coverId,
      })
    );
    closeMenu();
  };

  const onClickDeleteCover = () => {
    closeMenu();
    contextDispatch({
      type: ReducerTypes.onConfirmAction,
      payload: () => handleDeleteFile(),
    });
  };

  return (
    <Draggable key={task._id} draggableId={task._id} index={index}>
      {(provided) => (
        <Box {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <Card sx={{ my: 0.5, pt: covers[task._id] ? 19 : 2, position: 'relative' }}>
            {Boolean(covers[task._id]) && (
              <Box
                sx={{
                  height: 140,
                  width: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
              >
                <Box
                  component="img"
                  src={`${URL}${covers[task._id].path}`}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                />
              </Box>
            )}
            <CardContent>
              <Box
                sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Typography level="h2" fontSize="lg" sx={{ wordBreak: 'break-word' }}>
                  {task.title}
                </Typography>
                <IconButtonJoy
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
                </IconButtonJoy>

                <Menu id="task-menu" anchorEl={anchorEl} open={isOpen} onClose={closeMenu}>
                  <MenuItem onClick={onClickEdit}>
                    <ListItemDecorator>
                      <EditIcon />
                    </ListItemDecorator>
                    {t('edit')}
                  </MenuItem>

                  {!(isPoints || Boolean(points.length)) && (
                    <MenuItem onClick={onClickAddPoints}>
                      <ListItemDecorator sx={{ color: 'inherit' }}>
                        <FormatListBulletedRoundedIcon />
                      </ListItemDecorator>
                      {t('addCheckList')}
                    </MenuItem>
                  )}

                  <MenuItem onClick={onClickAddFile}>
                    <ListItemDecorator sx={{ color: 'inherit' }}>
                      <AttachFileRoundedIcon />
                    </ListItemDecorator>
                    {t('addFile')}
                  </MenuItem>
                  {covers[task._id] ? (
                    <>
                      <MenuItem onClick={onClickAddCover}>
                        <ListItemDecorator sx={{ color: 'inherit' }}>
                          <WallpaperOutlinedIcon />
                        </ListItemDecorator>
                        {t('changeCover')}
                      </MenuItem>
                      <MenuItem onClick={onClickDeleteCover}>
                        <ListItemDecorator sx={{ color: 'inherit' }}>
                          <HideImageOutlinedIcon />
                        </ListItemDecorator>
                        {t('deleteCover')}
                      </MenuItem>
                    </>
                  ) : (
                    <MenuItem onClick={onClickAddCover}>
                      <ListItemDecorator sx={{ color: 'inherit' }}>
                        <AddPhotoAlternateOutlinedIcon />
                      </ListItemDecorator>
                      {t('addCover')}
                    </MenuItem>
                  )}
                  <MenuItem onClick={onClickDelete} color="danger">
                    <ListItemDecorator sx={{ color: 'inherit' }}>
                      <DeleteIcon />
                    </ListItemDecorator>
                    {t('deleteTask')}
                  </MenuItem>
                </Menu>
              </Box>
              <Box>
                <Typography textColor="text.secondary" sx={{ wordBreak: 'break-word' }}>
                  {task.description}
                </Typography>
              </Box>

              {(Boolean(files.length) || Boolean(points?.length) || isPoints) && (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                    {(Boolean(points.length) || isPoints) && (
                      <Typography
                        variant="soft"
                        sx={{ pr: 1, m: 0, height: 24, color: 'text.secondary' }}
                        startDecorator={<FormatListBulletedRoundedIcon sx={{ fontSize: 16 }} />}
                      >
                        {t('checklist')}
                      </Typography>
                    )}
                    {Boolean(files.length) && (
                      <Typography
                        variant="soft"
                        sx={{ pr: 1, m: 0, height: 24, color: 'text.secondary' }}
                        startDecorator={<AttachFileRoundedIcon sx={{ fontSize: 16 }} />}
                      >
                        {files.length}
                      </Typography>
                    )}
                    <IconButton
                      onClick={() => setExpanded(!expanded)}
                      aria-expanded={expanded}
                      aria-label="show more"
                      sx={{ ml: 'auto', transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)' }}
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </Box>
                  <Collapse in={expanded} timeout="auto">
                    <Points
                      taskId={task._id}
                      boardId={task.boardId}
                      isShow={isPoints}
                      setIsShow={setIsPoints}
                      data={points}
                      setExpanded={setExpanded}
                    />

                    {Boolean(files.length) && (
                      <>
                        <Divider sx={{ my: 1 }} />
                        <List sx={{ p: 0 }}>
                          {files.map((file) => (
                            <ListItem key={file._id} sx={{ px: 0 }}>
                              <FileAttachment name={file.name} path={file.path} fileId={file._id} />
                            </ListItem>
                          ))}
                        </List>
                      </>
                    )}
                  </Collapse>
                </>
              )}
            </CardContent>
          </Card>
        </Box>
      )}
    </Draggable>
  );
};
