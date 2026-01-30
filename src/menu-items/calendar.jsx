import { CalendarIcon } from '@heroicons/react/24/outline';



const icons = {
    CalendarIcon,
};

const calendar = {
  id: 'group-calendar',
  title: '',
  type: 'group',
  children: [
    {
      id: 'calendar',
      title: 'Calendar',
      type: 'item',
      url: '/calendar',
      icon: icons.CalendarIcon,
      breadcrumbs: false,
    },
  ]
}


export default calendar;