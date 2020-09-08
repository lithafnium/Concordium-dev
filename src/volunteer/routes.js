import firebase from 'firebase/app';
import Index from './views/Index';
import Profile from './views/examples/Profile';
import Chat from './views/examples/Chat';
import Assistance from './views/examples/Assistance';
import Icons from './views/examples/Icons';

require('firebase/auth');
require('firebase/storage');
require('firebase/database');


const routes = [
  {
    path: '/chat',
    name: 'Dashboard',
    icon: 'ni ni-chat-round text-orange',
    component: Chat,
    layout: '/volunteer-tool',
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    icon: 'ni ni-single-02 text-yellow',
    component: Profile,
    layout: '/volunteer-tool',
  },
  {
    path: '/',
    name: 'Log Out',
    icon: 'ni ni-support-16 text-pink',
    component: Assistance,
    layout: '',
  },
];
export default routes;
