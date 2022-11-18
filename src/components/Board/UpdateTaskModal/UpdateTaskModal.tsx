import { FormLabel, Textarea } from '@mui/joy';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import TextField from '@mui/joy/TextField';
import Typography from '@mui/joy/Typography';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { UpdateTaskType, useUpdateTaskMutation } from '../../../store/slices/tasks/tasksApi';
import { closeUpdateTaskModal } from '../../../store/slices/tasks/tasksSlice';

type FormType = {
  title: string;
  description: string;
};

export const UpdateTaskModal = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { control, handleSubmit, reset } = useForm<FormType>();
  const [updateTask, { isError, isSuccess }] = useUpdateTaskMutation();

  const { isUpdateModalOpened } = useAppSelector((state) => state.tasks);
  const { id: userId } = useAppSelector((state) => state.user);

  const onClose = () => {
    dispatch(closeUpdateTaskModal());
    reset();
  };

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    const task: UpdateTaskType = {
      body: { ...data, users: [], order: 0, userId },
    };

    await updateTask(task).unwrap();

    if (isError) {
      toast.error('Error');
    }
    if (isSuccess) {
      toast.success('taskAdded');
    }

    onClose();
  };

  return (
    <Modal open={isUpdateModalOpened} onClose={onClose}>
      <ModalDialog
        aria-labelledby="add-column-modal-dialog-title"
        sx={{
          maxWidth: 500,
          borderRadius: 'md',
          p: 3,
          boxShadow: 'lg',
        }}
      >
        <Typography id="add-column-modal-dialog-title" component="h2" level="inherit" fontSize="1.25em" mb="0.25em">
          {t('newTask')}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={1}>
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

            <Button type="submit">{t('createTask')}</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
};
