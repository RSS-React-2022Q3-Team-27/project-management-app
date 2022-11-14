import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Textarea from '@mui/joy/Textarea';
import TextField from '@mui/joy/TextField';
import Typography from '@mui/joy/Typography';
import { useEffect } from 'react';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { isAddedFalse, setIsOpenedDialogAddBoard } from '../../store/slices/boards/boardsSlice';
import { createBoard } from '../../store/slices/boards/boardsThunks';

type FormType = {
  title: string;
  description: string;
};

const clearForm = {
  title: '',
  description: '',
};

export default function DialogAddBoard() {
  const { isAdded, isOpenedDialogAddBoard } = useAppSelector((state) => state.boards);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { control, handleSubmit, reset } = useForm<FormType>();

  useEffect(() => {
    if (isAdded) {
      toast.success(t('boardAdded'));
      dispatch(isAddedFalse());
    }
  }, [isAdded, dispatch, t]);

  const onClose = () => {
    reset(clearForm);
    dispatch(setIsOpenedDialogAddBoard(false));
  };

  const onSubmit: SubmitHandler<FormType> = (data) => {
    dispatch(createBoard({ ...data, users: [] }));
    onClose();
  };

  return (
    <Modal open={isOpenedDialogAddBoard} onClose={onClose}>
      <ModalDialog
        aria-labelledby="basic-modal-dialog-title"
        aria-describedby="basic-modal-dialog-description"
        sx={{
          maxWidth: 500,
          borderRadius: 'md',
          p: 3,
          boxShadow: 'lg',
        }}
      >
        <Typography id="basic-modal-dialog-title" component="h2" level="inherit" fontSize="1.25em" mb="0.25em">
          {t('createNewBoard')}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{ required: 'Field is require' }}
              render={({ field }) => <TextField {...field} label={t('title')} autoFocus required />}
            />

            <Controller
              name="description"
              control={control}
              defaultValue=""
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

            <Button type="submit">{t('createNewBoard')}</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}
