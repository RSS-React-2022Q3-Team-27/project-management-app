import Box from '@mui/joy/Box';

import { UserInfo } from '../../components/Profile/UserInfo/UserInfo';
import { UserTasks } from '../../components/Profile/UserTasks/UserTasks';

export const Profile = () => {
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', my: 4, px: 1 }}>
      <UserInfo />
      <UserTasks />
    </Box>
  );
};
