import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';

// dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));

// components
const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));

// pages
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
const EmployeePage = Loadable(lazy(() => import('../pages/Employee/employee')));
const ProjectPage = Loadable(lazy(() => import('pages/project')));
const LogoutPage = Loadable(lazy(() => import('pages/logout')));
const VacationPage = Loadable(lazy(() => import('pages/vacation')));
const CalendarPage = Loadable(lazy(() => import('../pages/calendar')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    {
      index: true,
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
    },
    {
      path: 'calendar',
      element: <CalendarPage />
    }
  ]
};

export default MainRoutes;
