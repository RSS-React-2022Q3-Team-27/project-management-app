import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import IconButton from '@mui/joy/IconButton';
import { useColorScheme } from '@mui/joy/styles';

export const ModeToggle = () => {
  const { mode, setMode } = useColorScheme();
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="outlined"
      color="neutral"
      sx={{ borderRadius: 50 }}
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
    >
      {mode === 'light' ? <DarkModeOutlinedIcon color="primary" /> : <LightModeRoundedIcon color="primary" />}
    </IconButton>
  );
};
