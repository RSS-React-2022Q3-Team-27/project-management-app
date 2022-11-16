import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/joy/Box';
import TextField from '@mui/joy/TextField';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type FormType = {
  search: string;
};

export const MainSearch = () => {
  const { t } = useTranslation();
  const { control, handleSubmit, reset } = useForm<FormType>();

  const onSubmit: SubmitHandler<FormType> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <Box sx={{ maxWidth: 350, minWidth: 280 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="search"
          control={control}
          defaultValue=""
          rules={{ required: 'Field is require' }}
          render={({ field }) => (
            <TextField
              {...field}
              type="text"
              placeholder={t('search')}
              autoFocus
              variant="outlined"
              startDecorator={<SearchIcon />}
            />
          )}
        />
      </form>
    </Box>
  );
};
