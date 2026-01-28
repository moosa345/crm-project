// assets
import { Squares2X2Icon } from "@heroicons/react/24/outline";



// icons
const icons = {
  Squares2X2Icon,

};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: '',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.Squares2X2Icon,
      breadcrumbs: false,
    },
  ]
};

export default dashboard;
