import React from 'react';

import { UserInfo } from '../../components/Profile/UserInfo/UserInfo';
import { UserTasks } from '../../components/Profile/UserTasks/UserTasks';

export const Profile = () => {
  return (
    <>
      <UserInfo />
      <UserTasks />
    </>
  );
};
