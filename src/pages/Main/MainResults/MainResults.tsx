import { Box } from '@mui/joy';

import { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import { toast } from 'react-toastify';

import { DialogConfirm } from '../../../components/DialogConfirm/DialogConfirm';
import { DialogEditBoard } from '../../../components/DialogEditBoard/DialogEditBoard';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { isDeletedFalse, isEditedFalse } from '../../../store/slices/boards/boardsSlice';
import { deleteBoard } from '../../../store/slices/boards/boardsThunks';
import { BoardCard } from '../BoardCard/BoardCard';

export const MainResults = () => {
  const { boards, isDeleted, isEdited, isOpenedDialogEditBoard } = useAppSelector((state) => state.boards);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [boardId, setBoardId] = useState('');

  useEffect(() => {
    if (isDeleted) {
      toast.success(t('boardDeleted'));
      dispatch(isDeletedFalse());
    }
  }, [isDeleted, dispatch, t]);

  useEffect(() => {
    if (isEdited) {
      toast.success(t('boardEdited'));
      dispatch(isEditedFalse());
    }
  }, [isEdited, dispatch, t]);

  const onConfirm = () => {
    dispatch(deleteBoard(boardId));
  };

  const cards = boards.map((board) => <BoardCard key={board._id} board={board} setBoardId={(id) => setBoardId(id)} />);

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
        {cards}
      </Box>
      <DialogConfirm onConfirm={onConfirm} />
      {isOpenedDialogEditBoard ? <DialogEditBoard /> : null}
    </>
  );
};
