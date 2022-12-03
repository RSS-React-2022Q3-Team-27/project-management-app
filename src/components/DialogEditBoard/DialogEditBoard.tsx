import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Textarea from '@mui/joy/Textarea';
import TextField from '@mui/joy/TextField';
import Typography from '@mui/joy/Typography';
import { useCallback } from 'react';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { EditBoardType, useEditBoardMutation } from '../../store/slices/boards/boardsApi';
import { setCurrentBoard, setIsOpenedDialogEditBoard } from '../../store/slices/boards/boardsSlice';

type FormType = {
  title: string;
  description: string;
};

const clearForm = {
  title: '',
  description: '',
};

export const DialogEditBoard = () => {
  const { currentBoard } = useAppSelector((state) => state.boards);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { control, handleSubmit, reset } = useForm<FormType>();
  const [editBoard, { isLoading }] = useEditBoardMutation();

  const onClose = useCallback(() => {
    reset(clearForm);
    dispatch(setCurrentBoard(null));
    dispatch(setIsOpenedDialogEditBoard(false));
  }, [dispatch, reset]);

  const onSubmit: SubmitHandler<FormType> = async (formData) => {
    const data: EditBoardType = {
      body: { ...formData, users: [], owner: currentBoard?.owner ?? '' },
      boardId: currentBoard?._id ?? '',
    };
    await editBoard(data)
      .unwrap()
      .then(() => {
        toast.success(t('boardEdited'));
        onClose();
      })
      .catch(() => toast.error(t('serverError')));
  };

  return (
    <Modal open={true} onClose={onClose}>
      <ModalDialog
        aria-labelledby="basic-modal-dialog-title"
        aria-describedby="basic-modal-dialog-description"
        sx={{
          maxWidth: 500,
          borderRadius: 'md',
          p: 3,
          boxShadow: 'lg',
          border: 'none',
        }}
      >
        <Typography
          id="basic-modal-dialog-title"
          component="h2"
          level="inherit"
          fontSize="1.25em"
          sx={{ mb: 1, textAlign: 'center' }}
        >
          {t('board')}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="title"
              control={control}
              defaultValue={currentBoard?.title}
              rules={{ required: 'Field is require' }}
              render={({ field }) => <TextField {...field} label={t('title')} autoFocus required />}
            />

            <Controller
              name="description"
              control={control}
              defaultValue={currentBoard?.description}
              rules={{ required: 'Field is require' }}
              render={({ field }) => {
                return (
                  <FormControl>
                    <FormLabel required>{t('description')}</FormLabel>
                    <Textarea {...field} minRows={3} required />
                  </FormControl>
                );
              }}
            />

            <Button type="submit" loading={isLoading}>
              {t('editBoard')}
            </Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
};
