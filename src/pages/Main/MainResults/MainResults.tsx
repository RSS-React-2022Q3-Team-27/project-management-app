import { Box } from '@mui/joy';

import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import { toast } from 'react-toastify';

import { SearchResults } from './SearchResults/SearchResults';

import { DialogEditBoard } from '../../../components/DialogEditBoard/DialogEditBoard';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { isDeletedFalse, isEditedFalse } from '../../../store/slices/boards/boardsSlice';
import { BoardCard } from '../BoardCard/BoardCard';

export const MainResults = () => {
  const { boards, isDeleted, isEdited, isOpenedDialogEditBoard } = useAppSelector((state) => state.boards);
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.tasks);
  const { t } = useTranslation();

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

  const cards = boards.map((board) => <BoardCard key={board._id} board={board} />);

  return (
    <>
      {searchQuery ? (
        <SearchResults />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
          {cards}
        </Box>
      )}

      {isOpenedDialogEditBoard ? <DialogEditBoard /> : null}
    </>
  );
};
