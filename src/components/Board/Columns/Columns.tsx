import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAppDispatch } from '../../../store/hooks';
import { setConfirmOpened } from '../../../store/slices/app/appSlice';

import {
  DeleteColumnType,
  useDeleteColumnMutation,
  useGetColumnsInBoardQuery,
} from '../../../store/slices/board/boardApi';
import { openAddColumnModal, setColumnsLength } from '../../../store/slices/board/boardSlice';
import { DialogConfirm } from '../../DialogConfirm/DialogConfirm';

export const Columns = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id?: string }>();
  const { data, isError } = useGetColumnsInBoardQuery(id || '');
  const [deleteColumn] = useDeleteColumnMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isError) {
      toast.error('Error');
    }
  }, [isError]);

  console.log(data);

  const handleClick = () => {
    dispatch(openAddColumnModal());
    dispatch(setColumnsLength(data?.length));
  };

  const onConfirm = async (data: DeleteColumnType) => {
    await deleteColumn({ ...data }).unwrap();
  };

  const handleDelete = () => {
    dispatch(setConfirmOpened(true));
  };

  const boardColumns = data?.map((column) => (
    <Box
      key={column._id}
      sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: 260, flexShrink: 0, height: '100%' }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography component="h3" level="h6">
          {column.title}
        </Typography>
        <IconButton variant="outlined" color="neutral">
          <DeleteIcon onClick={handleDelete} />
        </IconButton>
      </Box>
      <Box sx={{ height: '100%', border: 1, borderColor: 'grey.200', borderRadius: 8 }}></Box>

      <DialogConfirm onConfirm={() => onConfirm({ boardId: column.boardId, columnId: column._id })} />
    </Box>
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
          }}
        >
          {boardColumns}
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
