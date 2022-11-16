import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAppDispatch } from '../../../store/hooks';

import { useDeleteColumnMutation, useGetColumnsInBoardQuery } from '../../../store/slices/board/boardApi';
import { openAddColumnModal, setColumnsLength } from '../../../store/slices/board/boardSlice';
import { DialogConfirm } from '../../DialogConfirm/DialogConfirm';
import { Column } from '../Column';

export const Columns = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id?: string }>();
  const { data, isError } = useGetColumnsInBoardQuery(id || '');
  const [deleteColumn] = useDeleteColumnMutation();
  const dispatch = useAppDispatch();
  const [columnId, setColumnId] = useState('');

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

  const onConfirm = async () => {
    const column = data?.find((column) => column._id === columnId);
    if (column) {
      const { _id: columnId, boardId } = column;
      await deleteColumn({ columnId, boardId }).unwrap();
    }
  };

  const boardColumns = data?.map((column) => (
    <Column key={column._id} column={column} setColumnId={(id: string) => setColumnId(id)} />
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
      <DialogConfirm onConfirm={onConfirm} />
    </>
  );
};
