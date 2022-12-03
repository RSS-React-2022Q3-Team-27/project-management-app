import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import TextField from '@mui/joy/TextField';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface AddPointFormType {
  title: string;
}

interface IProps {
  toggleModal: (val: boolean) => void;
  isOpen: boolean;
  setPointText: (text: string) => void;
}

export const AddPointModal = ({ toggleModal, isOpen, setPointText }: IProps) => {
  const { t } = useTranslation();
  const { control, handleSubmit, reset } = useForm<AddPointFormType>();

  const onSubmit: SubmitHandler<AddPointFormType> = ({ title }) => {
    setPointText(title);
    toggleModal(false);
    reset();
  };

  return (
    <Modal
      aria-labelledby="add-point-modal-dialog-title"
      aria-describedby="add-point-modal-dialog-description"
      open={isOpen}
      onClose={() => toggleModal(false)}
    >
      <ModalDialog variant="outlined" role="add-point-modal" sx={{ border: 'none' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{ required: 'Field is require' }}
              render={({ field }) => <TextField {...field} autoFocus required />}
            />
            <Button type="submit">{t('addItem')}</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
};
