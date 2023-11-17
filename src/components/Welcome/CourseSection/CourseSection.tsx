import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { useTranslation } from 'react-i18next';

import { SCHOOL_LINK, SCHOOL_TASK } from '../../../constants/DEVELOPERS';
import { TECHNOLOGIES } from '../../../constants/TECHNOLOGIES';

export const CourseSection = () => {
  const { t } = useTranslation();

  const techs = TECHNOLOGIES.map((tech) => (
    <Box
      key={tech.name}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        borderRadius: 50,
        py: 1,
        px: 2,
        bgcolor: 'background.level1',
      }}
    >
      <Box component="img" src={tech.image} alt={tech.name} sx={{ width: 40, height: 40 }} />
      <Typography level="body1" textColor="text.secondary">
        {tech.name}
      </Typography>
    </Box>
  ));

  return (
    <Sheet
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        borderRadius: 40,
      }}
    >
      <Typography
        level="h5"
        component="h2"
        sx={{ position: 'relative', left: -16, bgcolor: 'background.surface', py: 2, pl: 2 }}
      >
        {t('development')}
      </Typography>
      <Typography
        level="h5"
        component="p"
        textColor="text.secondary"
        sx={{
          fontWeight: 'sm',
          textAlign: 'center',
          px: 2,
          pt: 6,
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
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', px: 2, py: 6 }}>{techs}</Box>
    </Sheet>
  );
};
