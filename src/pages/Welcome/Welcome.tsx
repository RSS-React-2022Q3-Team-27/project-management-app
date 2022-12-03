import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';

import { AdvantageSection } from '../../components/Welcome/AdvantageSection';
import { CourseSection } from '../../components/Welcome/CourseSection';
import { DevSection } from '../../components/Welcome/DevSection';

import { PromoSection } from '../../components/Welcome/PromoSection';

export const Welcome = () => {
  return (
    <Sheet variant="plain">
      <PromoSection />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mx: 'auto',
          maxWidth: 960,
          px: 2,
        }}
      >
        <Box sx={{ borderLeft: '3px solid var(--joy-palette-background-level1)' }}>
          <AdvantageSection />
          <CourseSection />
          <DevSection />
        </Box>
      </Box>
    </Sheet>
  );
};
