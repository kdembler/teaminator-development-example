import Home from './components/home/home';
import Skills from './components/skills/skills';

export default function routes() {
  return [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/skills',
      name: 'Skills',
      component: Skills
    }
  ];
}
