import { Box, Divider, Sheet, Typography } from '@mui/joy';
import { nanoid } from '@reduxjs/toolkit';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { ProfileTask } from './ProfileTask/ProfileTask';
import style from './UserTasks.module.css';

import { useAppSelector } from '../../../store/hooks';
import { useGetTasksByUserIdQuery } from '../../../store/slices/tasks/tasksApi';

// const data = [
//   {
//     boardId: '6374e801c436eee2df218e58',
//     columnId: '6374f9c3d504dcb5a5d25736',
//     description:
//       'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum necessitatibus, earum totam quam reprehenderit hic quas consequuntur. Quam beatae, animi sapiente eos ea nam soluta nobis pariatur. Distinctio, repellat soluta?',
//     order: 0,
//     title: 'Task 1 Col 3',
//     userId: '6372c56f8b88904ff460c313',
//     users: [],
//     _id: '63776af74b15bd2c8dca0468',
//   },
//   {
//     boardId: '6374e801c436eee2df218e58',
//     columnId: '6374f9c3d504dcb5a5d25736',
//     description:
//       'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum necessitatibus, earum totam quam reprehenderit hic quas consequuntur. Quam beatae, animi sapiente eos ea nam soluta nobis pariatur. Distinctio, repellat soluta?',
//     order: 0,
//     title: 'Task 1 Col 3',
//     userId: '6372c56f8b88904ff460c313',
//     users: [],
//     _id: '63776af74b15bd2c8dca0468',
//   },
//   {
//     boardId: '6374e801c436eee2df218e58',
//     columnId: '6374f9c3d504dcb5a5d25736',
//     description:
//       'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum necessitatibus, earum totam quam reprehenderit hic quas consequuntur. Quam beatae, animi sapiente eos ea nam soluta nobis pariatur. Distinctio, repellat soluta? Lorem Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum necessitatibus, earum totam quam reprehenderit hic quas consequuntur. Quam beatae, animi sapiente eos ea nam soluta nobis pariatur. Distinctio, repellat soluta?',
//     order: 0,
//     title: 'Task 1 Col 3',
//     userId: '6372c56f8b88904ff460c313',
//     users: [],
//     _id: '63776af74b15bd2c8dca0468',
//   },
//   {
//     boardId: '6374e801c436eee2df218e58',
//     columnId: '6374f9c3d504dcb5a5d25736',
//     description:
//       'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum necessitatibus, earum totam quam reprehenderit hic quas consequuntur. Quam beatae, animi sapiente eos ea nam soluta nobis pariatur. Distinctio, repellat soluta?',
//     order: 0,
//     title: 'Task 1 Col 3',
//     userId: '6372c56f8b88904ff460c313',
//     users: [],
//     _id: '63776af74b15bd2c8dca0468',
//   },
//   {
//     boardId: '6374e801c436eee2df218e58',
//     columnId: '6374f9c3d504dcb5a5d25736',
//     description:
//       'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum necessitatibus, earum totam quam reprehenderit hic quas consequuntur. Quam beatae, animi sapiente eos ea nam soluta nobis pariatur. Distinctio, repellat soluta?',
//     order: 0,
//     title: 'Task 1 Col 3',
//     userId: '6372c56f8b88904ff460c313',
//     users: [],
//     _id: '63776af74b15bd2c8dca0468',
//   },
//   {
//     boardId: '6374e801c436eee2df218e58',
//     columnId: '6374f9c3d504dcb5a5d25736',
//     description:
//       'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum necessitatibus, earum totam quam reprehenderit hic quas consequuntur. Quam beatae, animi sapiente eos ea nam soluta nobis pariatur. Distinctio, repellat soluta?',
//     order: 0,
//     title: 'Task 1 Col 3',
//     userId: '6372c56f8b88904ff460c313',
//     users: [],
//     _id: '63776af74b15bd2c8dca0468',
//   },
//   {
//     boardId: '6374e801c436eee2df218e58',
//     columnId: '6374f9c3d504dcb5a5d25736',
//     description:
//       'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum necessitatibus, earum totam quam reprehenderit hic quas consequuntur. Quam beatae, animi sapiente eos ea nam soluta nobis pariatur. Distinctio, repellat soluta?',
//     order: 0,
//     title: 'Task 1 Col 3',
//     userId: '6372c56f8b88904ff460c313',
//     users: [],
//     _id: '63776af74b15bd2c8dca0468',
//   },
//   {
//     boardId: '6374e801c436eee2df218e58',
//     columnId: '6374f9c3d504dcb5a5d25736',
//     description:
//       'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum necessitatibus, earum totam quam reprehenderit hic quas consequuntur. Quam beatae, animi sapiente eos ea nam soluta nobis pariatur. Distinctio, repellat soluta?',
//     order: 0,
//     title: 'Task 1 Col 3',
//     userId: '6372c56f8b88904ff460c313',
//     users: [],
//     _id: '63776af74b15bd2c8dca0468',
//   },
// ];

export const UserTasks = () => {
  const { t } = useTranslation();
  const { id } = useAppSelector((state) => state.user);
  const { data } = useGetTasksByUserIdQuery(id);

  return (
    <Sheet
      sx={{
        maxWidth: 1200,
        width: '100vw',
        overflow: 'auto',
        mx: 'auto',
        my: 4,
        py: 3,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'sm',
        boxShadow: 'md',
      }}
      variant="outlined"
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', margin: 2 }}>
        <Typography level="h2">{t('yourTasks')}</Typography>
      </Box>
      <Divider />
      <Box
        className={style.list}
        sx={{
          width: '100%',
          overflow: 'auto',
          mx: 'auto',
          px: 2,
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          borderRadius: 'sm',
          minHeight: '100px',
        }}
      >
        {!data?.length && (
          <Typography sx={{ py: 6, margin: '0 auto' }} level="body1">
            {t('yourHaventtGotTasks')}
          </Typography>
        )}
        {data?.map((task) => (
          <ProfileTask task={task} key={nanoid()} />
        ))}
      </Box>
    </Sheet>
  );
};
