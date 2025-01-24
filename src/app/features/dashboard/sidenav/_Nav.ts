import { Title } from '@angular/platform-browser';

export const navItems = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-apps' },
    badge: {
      color: 'info',
      text: '',
    },
  },

  {
    title: true,
    name: 'Người theo dõi',
  },
  {
    name: 'Theo dõi',
    url: '#',
    iconComponent: { name: 'cil-arrow-right' },
  },

  {
    title: true,
    name: 'Sản phẩm',
  },
  {
    name: 'Sản phẩm',
    url: 'product',
    iconComponent: { name: 'cil-arrow-right' },
  },
  {
    title: true,
    name: 'Oder',
  },

  {
    name: 'Oders',
    url: 'listOders',
    iconComponent: { name: 'cil-arrow-right' },
  },
  {
    title: true,
    name: 'Mã giảm giá',
  },
  {
    name: 'Giảm giá',
    url: '/discount',
    iconComponent: { name: 'cil-arrow-right' },
  },
];
