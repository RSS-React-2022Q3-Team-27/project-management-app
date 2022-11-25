import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import TextField from '@mui/joy/TextField';
import { useState } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setSearchQuery } from '../../../store/slices/tasks/tasksSlice';

type FormType = {
  search: string;
};

export const SearchInput = () => {
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.tasks);
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<FormType>();

  const [isFocus, setIsFocus] = useState(true);

  const onSubmit: SubmitHandler<FormType> = ({ search }) => {
    if (search.trim()) {
      dispatch(setSearchQuery(search));
    }
  };

  return (
    <Box sx={{ maxWidth: 350, minWidth: 280 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="search"
          control={control}
          defaultValue={searchQuery}
          rules={{ required: 'Field is require' }}
          render={({ field }) => (
            <TextField
              {...field}
              type="search"
              placeholder={t('search')}
              autoFocus
              variant="outlined"
              endDecorator={
                <IconButton
                  color={isFocus ? 'primary' : 'neutral'}
                  size="lg"
                  variant={isFocus ? 'solid' : 'soft'}
                  type="submit"
                >
                  <SearchIcon />
                </IconButton>
              }
              onBlur={() => setIsFocus(false)}
              onFocus={() => setIsFocus(true)}
            />
          )}
        />
      </form>
    </Box>
  );
};
