import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AddColumnModal } from '../../components/Board/AddColumnModal';
import { AddFileModal } from '../../components/Board/AddFileModal';
import { AddTaskModal } from '../../components/Board/AddTaskModal';
import { Columns } from '../../components/Board/Columns';
import { UpdateTaskModal } from '../../components/Board/UpdateTaskModal';

import { ROUTES } from '../../constants/routes';

import { useGetBoardByIdQuery } from '../../store/slices/board/boardApi';

export const Board = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id?: string }>();
  const { data, isError } = useGetBoardByIdQuery(id || '', { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (isError) {
      toast.error(t('serverError'), {
        toastId: 'serverError',
      });
    }
  }, [isError, t]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: 2,
        pl: 2,
        pt: 4,
        pb: 2,
      }}
    >
      <Button
        component={RouterLink}
        to={ROUTES.MAIN.path}
        startDecorator={<ArrowBackIosNewRoundedIcon />}
        color="neutral"
        variant="plain"
        sx={{ mr: 'auto', ml: 1 }}
      >
        {t('toMainPage')}
      </Button>
      <Box sx={{ height: 36 }}>
        <Typography component="h2" sx={{ fontSize: 24, ml: 1 }}>
          {data?.title}
        </Typography>
      </Box>
      <Columns />
      <AddColumnModal />
      <AddTaskModal />
      <UpdateTaskModal />
      <AddFileModal />
    </Box>
  );
};
