import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/dashboard',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Заявки',
    icon: 'nb-locked',
    children: [
      {
        title: 'Список',
        link: '/orders/list',
      }
    ],
  },
  {
    title: 'Пользователи',
    icon: 'nb-locked',
    children: [
      {
        title: 'Список',
        link: '/users/list',
      }
    ],
  },
];
