import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';



const icons = {
    AirplanemodeActiveIcon
};

const vacations = {
  id: 'group-vacations',
  title: '',
  type: 'group',
  children: [
    {
      id: 'vacations',
      title: 'Vacations',
      type: 'item',
      url: '/vacations',
      icon: icons.AirplanemodeActiveIcon,
      breadcrumbs: false
    }
  ]
};

export default vacations;
