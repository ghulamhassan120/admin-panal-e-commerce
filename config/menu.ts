export interface MenuItem {
  title: string;
  path: string;
  icon?: string;
  children?: {
    title: string;
    path: string;
  }[];
}

export const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    path: '/',
    icon: 'Dashboard'
  },
  {
    title: 'Users',
    path: '#',
    icon: 'Users',
    children: [
      { title: 'Social Profile', path: '/users/social-profile' },
      { title: 'Account Profile', path: '/users/account-profile' },
      { title: 'Cards', path: '/users/cards' },
      { title: 'List', path: '/users/list' }
    ]
  },
  {
    title: 'Customer',
    path: '#',
    icon: 'Customer',
    children: [
      { title: 'List', path: '/customer/list' },
      { title: 'Create', path: '/customer/create' },
      { title: 'Edit', path: '/customer/edit' },
      { title: 'Details', path: '/customer/details' }
    ]
  },
  {
    title: 'Order',
    path: '#',
    icon: 'Order',
    children: [
      { title: 'List', path: '/order/list' },
      { title: 'Create', path: '/order/create' },
      { title: 'Edit', path: '/order/edit' },
      { title: 'Details', path: '/order/details' }
    ]
  }
];