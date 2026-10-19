import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/', label: '대시보드', end: true },
  { to: '/reports', label: '리포트 목록', end: false },
  { to: '/about', label: '서비스 소개', end: false },
];

const Sidebar = () => {
  return (
    <aside className="flex w-56 flex-col border-r border-gray-200 bg-white px-4 py-6">
      <span className="mb-8 px-2 text-lg font-bold text-blue-600">한빛리서치</span>
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm font-medium ${
                isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
