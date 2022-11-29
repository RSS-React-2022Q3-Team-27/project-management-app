import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import Link from '@mui/joy/Link';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { useTranslation } from 'react-i18next';

import { SCHOOL_LINK, SCHOOL_TASK } from '../../../constants/DEVELOPERS';
import { TECHNOLOGIES } from '../../../constants/TECHNOLOGIES';

export const CourseSection = () => {
  const { t } = useTranslation();

  const techs = TECHNOLOGIES.map((tech) => (
    <Box key={tech.name} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box component="img" src={tech.image} sx={{ width: 40 }} />
      {tech.name}
    </Box>
  ));

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
        <Link href={SCHOOL_LINK} target="_blank" rel="noreferrer" underline="none">
          {t('rsSchoolReact')}
        </Link>{' '}
        {t('inAccordance')}
        <Link href={SCHOOL_TASK} target="_blank" rel="noreferrer" underline="none">
          {t('termsOfReference')}
        </Link>
      </Typography>
      <Divider />
      <Typography
        level="h5"
        component="h5"
        sx={{
          fontWeight: 'sm',
          textAlign: 'center',
        }}
      >
        {t('frontend')}
      </Typography>
      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>{techs}</Box>
    </Sheet>
  );
};
