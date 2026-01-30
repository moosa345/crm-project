import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';

// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));
// const EmployeePage = Loadable(lazy(() => import('pages/dashboard/employee')));
// const ProjectPage = Loadable(lazy(()=> import('pages/dashboard/project')));

// render - color
const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
const EmployeePage = Loadable(lazy(() => import('../pages/Employee/employee')));
const ProjectPage = Loadable(lazy(() => import('pages/project')));
const LogoutPage = Loadable(lazy(() => import('pages/logout')));
const VacationPage = Loadable(lazy(() => import('pages/vacation')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'Employee',
      element: <EmployeePage />
    },
    {
      path: 'project',
      element: <ProjectPage />
    },
    {
      path: 'vacations',
      element: <VacationPage />
    },
    {
      path: 'logout',
      element: <LogoutPage />
    }
  ]
};

export default MainRoutes;
