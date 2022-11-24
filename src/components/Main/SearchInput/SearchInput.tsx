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

export const SearchInput = () => {
  const dispatch = useAppDispatch();
  const [skip, setSkip] = useState(true);
  const { searchQuery } = useAppSelector((state) => state.tasks);
  const { id } = useAppSelector((state) => state.user);
  const { t } = useTranslation();
  const { control, handleSubmit, reset } = useForm<FormType>();
  const [query, setQuery] = useState('');
  const { data } = useGetTasksByQueryQuery({ search: query, userId: id }, { skip });
  const [isFocus, setIsFocus] = useState(true);

  const onSubmit: SubmitHandler<FormType> = ({ search }) => {
    if (search.trim()) {
      setQuery(search);
      dispatch(setSearchQuery(search));
      setSkip(false);
    }
  };

  const resetSearch = () => {
    setSkip(true);
    setQuery('');
    clearSearchInput();
    reset();
  };

  const clearSearchInput = useCallback(() => {
    dispatch(setSearchQuery(''));
    dispatch(setSearchQueryResults([]));
  }, [dispatch]);

  useEffect(() => {
    if (data) {
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
              type="search"
              placeholder={t('search')}
              autoFocus
              variant="outlined"
              endDecorator={
                <IconButton
                  color={isFocus ? 'primary' : 'neutral'}
                  size="lg"
                  variant={isFocus ? 'solid' : 'soft'}
                  type="button"
                  onClick={resetSearch}
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
