import { Outlet } from 'react-router-dom';

import Sidebar from '@/components/Sidebar';

const AppLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <header className="flex h-16 items-center border-b border-gray-200 bg-white px-8">
          <span className="text-sm font-medium text-gray-500">
            산업 리포트 대시보드
          </span>
        </header>
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
