import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { useTranslation } from 'react-i18next';

export const CourseSection = () => {
  const { t } = useTranslation();

  return (
    <Sheet
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        borderRadius: 40,
        gap: 2,
        p: 4,
      }}
    >
      <Typography
        level="h5"
        component="p"
        sx={{
          fontWeight: 'sm',
          textAlign: 'center',
        }}
      >
        {t('aboutCourse')}
      </Typography>
      <Typography
        level="h5"
        component="p"
        sx={{
          fontWeight: 'sm',
          textAlign: 'center',
        }}
      >
        <Typography variant="soft" color="primary">
          {t('frontend')}
        </Typography>
        <Typography
          level="h5"
          sx={{
            fontWeight: 'sm',
            textAlign: 'center',
          }}
        >
          {' '}
          {t('frontendTech')}
        </Typography>
      </Typography>
    </Sheet>
  );
};
