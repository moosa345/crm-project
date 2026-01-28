import { UsersIcon } from "@heroicons/react/24/outline";

const icons = {
  UsersIcon
};

const employee = {
  id: 'group-employee',
  title: '',
  type: 'group',
  children: [
    {
      id: 'employee',
      title: 'Employee',
      type: 'item',
      url: '/employee',
      icon: icons.UsersIcon,
      breadcrumbs: false,
    },
  ]
}

export default employee