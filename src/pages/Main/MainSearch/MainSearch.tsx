import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/joy';
import Box from '@mui/joy/Box';
import TextField from '@mui/joy/TextField';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import { useGetTasksByQueryQuery } from '../../../store/slices/tasks/tasksApi';
import { setSearchQuery, setSearchQueryResults } from '../../../store/slices/tasks/tasksSlice';

type FormType = {
  search: string;
};

export const MainSearch = () => {
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.tasks);
  const { id } = useAppSelector((state) => state.user);
  const { t } = useTranslation();
  const { control, handleSubmit, reset } = useForm<FormType>();
  const [query, setQuery] = useState('');
  const { data, refetch } = useGetTasksByQueryQuery({ search: query, id });

  const onSubmit: SubmitHandler<FormType> = ({ search }) => {
    if (search.trim()) {
      console.log('work');

      setQuery(search);
      dispatch(setSearchQuery(search));
      refetch();
    }
  };

  const resetSearch = () => {
    clearSearchInput();
    setQuery('');
    reset();
  };

  const clearSearchInput = useCallback(() => {
    dispatch(setSearchQuery(''));
    dispatch(setSearchQueryResults([]));
  }, [dispatch]);

  useEffect(() => {
    if (data?.length) {
      dispatch(setSearchQueryResults(data));
    }
  }, [data, dispatch, query]);
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
              type="text"
              placeholder={t('search')}
              autoFocus
              variant="outlined"
              startDecorator={<SearchIcon />}
              endDecorator={
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <IconButton variant="soft" color="neutral" type="button" onClick={resetSearch}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
              }
            />
          )}
        />
      </form>
    </Box>
  );
};
