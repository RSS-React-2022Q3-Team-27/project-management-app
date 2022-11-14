import i18next from 'i18next';

import devOne from '../assets/images/dev-1.svg';
import devTwo from '../assets/images/dev-2.svg';
import devThree from '../assets/images/dev-3.svg';

export const DEVELOPERS = [
  {
    nickname: 'Bumble-sakh',
    link: 'https://github.com/Bumble-sakh',
    name: i18next.t('firstDev'),
    image: devOne,
  },
  {
    nickname: 'LilithPrimary',
    link: 'https://github.com/LilithPrimary',
    name: i18next.t('secondDev'),
    image: devTwo,
  },
  {
    nickname: 'oxanacode',
    link: 'https://github.com/oxanacode',
    name: i18next.t('thirdDev'),
    image: devThree,
  },
];

export const SCHOOL_LINK = 'https://rs.school/react/';
