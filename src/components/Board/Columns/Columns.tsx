import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
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
import { Column } from '../Column';

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

  const boardColumns = data?.map((column) => <Column key={column._id} column={column} />);

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
      <DialogConfirm onConfirm={() => onConfirm({ boardId: column.boardId, columnId: column._id })} />
    </>
  );
};
