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
import { CreateBoardType, useCreateBoardMutation } from '../../store/slices/boards/boardsApi';
import { setIsOpenedDialogAddBoard } from '../../store/slices/boards/boardsSlice';

type FormType = {
  title: string;
  description: string;
};

const clearForm = {
  title: '',
  description: '',
};

export default function DialogAddBoard() {
  const { isOpenedDialogAddBoard } = useAppSelector((state) => state.boards);
  const { id: userId } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { control, handleSubmit, reset } = useForm<FormType>();
  const [createBoard, { isLoading }] = useCreateBoardMutation();

  const onClose = useCallback(() => {
    reset(clearForm);
    dispatch(setIsOpenedDialogAddBoard(false));
  }, [dispatch, reset]);

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    const body: CreateBoardType = {
      ...data,
      users: [],
      owner: userId,
    };
    await createBoard(body)
      .unwrap()
      .then(() => {
        toast.success(t('boardAdded'));
        onClose();
      })
      .catch(() => toast.error(t('serverError')));
  };

  return (
    <Modal open={isOpenedDialogAddBoard} onClose={onClose}>
      <ModalDialog
        aria-labelledby="basic-modal-dialog-title"
        aria-describedby="basic-modal-dialog-description"
        sx={{
          maxWidth: 500,
          borderRadius: 'md',
          border: 'none',
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

            <Button type="submit" loading={isLoading}>
              {t('createNewBoard')}
            </Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}
