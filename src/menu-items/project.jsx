import { FolderIcon } from "@heroicons/react/24/outline";

const icons = {
  FolderIcon
};

const project = {
  id: 'group-project',
  title: '',
  type: 'group',
  children: [
    {
      id: 'project',
      title: 'Project',
      type: 'item',
      url: '/project',
      icon: icons.FolderIcon,
      breadcrumbs: false,
    },
]
}

    export default project