export const ROUTES = {
  MAIN: { path: '/', title: 'Main', menu: true, menu_id: 0 },
  BOARD_ID: { path: '/board/:id', title: 'Board Id' },
  BOARD: { path: '/board/', title: 'Board' },
  PROFILE: { path: '/profile', title: 'Profile', menu: true, menu_id: 1 },
  WELCOME: { path: '/welcome', title: 'Welcome', menu: true, menu_id: 2 },
  SIGN_UP: { path: '/sign-up', title: 'Sign Up' },
  SIGN_IN: { path: '/sign-in', title: 'Sign In', menu: true, menu_id: 3 },
  NOT_FOUND: { path: '/404', title: '404' },
  ALL: { path: '/*' },
};
