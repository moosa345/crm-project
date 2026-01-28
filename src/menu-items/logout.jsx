import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

const icons = {
  ArrowRightOnRectangleIcon
};

const logout = {
  id: 'group-logout',
  title: '',
  type: 'group',
  children: [
    {
      id: 'logout',
      title: 'Logout',
      type: 'item',
      url: '/logout',
      icon: icons.ArrowRightOnRectangleIcon,
      breadcrumbs: false,
    }
  ]
};

export default logout