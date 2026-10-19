import { createBrowserRouter } from 'react-router-dom';

import AppLayout from '@/layouts/AppLayout';
import AboutPage from '@/pages/AboutPage';
import DashboardPage from '@/pages/DashboardPage';
import ReportDetailPage from '@/pages/ReportDetailPage';
import ReportListPage from '@/pages/ReportListPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'reports', element: <ReportListPage /> },
      { path: 'reports/:reportId', element: <ReportDetailPage /> },
      { path: 'about', element: <AboutPage /> },
    ],
  },
]);
