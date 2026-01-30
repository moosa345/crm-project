import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';

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
      icon: () => (
        <AirplanemodeActiveIcon
          sx={{
            width: 24,
            height: 24
          }}
        />
      ),
      breadcrumbs: false
    }
  ]
};

export default vacations;
