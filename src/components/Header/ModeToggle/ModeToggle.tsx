import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import IconButton from '@mui/joy/IconButton';
import { useColorScheme } from '@mui/joy/styles';

export const ModeToggle = () => {
  const { mode, setMode } = useColorScheme();
  return (
    <IconButton
      id="toggle-mode"
      size="md"
      variant="outlined"
      color="neutral"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
    >
      {mode === 'light' ? <DarkModeRoundedIcon color="primary" /> : <LightModeRoundedIcon color="primary" />}
    </IconButton>
  );
};
