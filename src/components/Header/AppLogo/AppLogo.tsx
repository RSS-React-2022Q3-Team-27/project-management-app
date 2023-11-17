import Link from '@mui/joy/Link';
import { Link as RouterLink } from 'react-router-dom';

import styles from './appLogo.module.css';

import { ROUTES } from '../../../constants/routes';

export const AppLogo = () => {
  return (
    <Link component={RouterLink} to={ROUTES.WELCOME.path} id="app-logo">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-labelledby="app-logo"
      >
        <rect width="40" height="40" rx="8" fill="var(--joy-palette-primary-solidBg)" className={styles.logo} />
        <path
          d="M4 7C4 5.34315 5.34315 4 7 4H9C10.6569 4 12 5.34315 12 7V33C12 34.6569 10.6569 36 9 36H7C5.34315 36 4 34.6569 4 33V7Z"
          fill="white"
        />
        <rect x="16" y="4" width="8" height="16" rx="3" fill="white" />
        <rect x="28" y="4" width="8" height="26" rx="3" fill="white" />
      </svg>
    </Link>
  );
};
