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
      { title: 'Account Profile', path: '/users/account-profile' }
    ]
  },
  {
    title: 'Products',
    path: '#',
    icon: 'Package',
    children: [
      { title: 'Products', path: '/products' }
    ]
  },
  {
    title: 'Order',
    path: '#',
    icon: 'Order',
    children: [
      { title: 'Orders', path: '/order/create' },
    ]
  }
];