import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link as RouterLink } from 'react-router-dom';

import { ROUTES } from '../../constants/routes';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getColumnsInBoard } from '../../store/slices/board/BoardThunks';

export const Board = () => {
  const { t } = useTranslation();
  const { title } = useAppSelector((state) => state.board);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getColumnsInBoard(id));
    }
  }, [dispatch, id]);

  const handleClick = () => {};

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: { xs: 1, sm: 2 },
        pl: 2,
        pt: { xs: 2, sm: 4 },
        pb: 2,
      }}
    >
      <Link
        component={RouterLink}
        to={ROUTES.MAIN.path}
        startDecorator={<ArrowBackIosNewRoundedIcon />}
        underline="none"
        color="neutral"
        sx={{ mr: 'auto' }}
      >
        {t('toMainPage')}
      </Link>
      <Typography component="h2" sx={{ fontSize: { xs: 24, sm: 36 } }}>
        {title}
      </Typography>
      <Box sx={{ flexGrow: 1, position: 'relative' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            overflowX: 'auto',
            position: 'absolute',
            gap: 1,
            inset: 0,
            pr: 2,
          }}
        >
          <Button startDecorator={<AddRoundedIcon />} sx={{ width: 260, flexShrink: 0 }} onClick={handleClick}>
            {t('addColumn')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
