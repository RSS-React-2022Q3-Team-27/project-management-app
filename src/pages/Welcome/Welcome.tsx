import Box from '@mui/joy/Box';

import { AdvantageSection } from '../../components/Welcome/AdvantageSection';
import { CourseSection } from '../../components/Welcome/CourseSection';
import { DevSection } from '../../components/Welcome/DevSection';

import { PromoSection } from '../../components/Welcome/PromoSection';

export const Welcome = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mx: 'auto', my: 4, maxWidth: 1080, px: 2 }}>
      <PromoSection />
      <AdvantageSection />
      <CourseSection />
      <DevSection />
    </Box>
  );
};
