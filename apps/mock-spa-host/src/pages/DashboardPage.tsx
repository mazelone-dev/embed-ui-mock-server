import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import StatCard from '@/components/StatCard';
import { REPORTS } from '@/constants/reports';

const RECENT_REPORT_COUNT = 3;

const DashboardPage = () => {
  const recentReports = [...REPORTS]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, RECENT_REPORT_COUNT);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
      <p className="mt-1 text-sm text-gray-500">
        오늘 기준 산업 리포트 현황을 한눈에 확인하세요.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="전체 리포트" value={`${REPORTS.length}건`} description="누적 발행 리포트 수" />
        <StatCard
          label="BUY 의견"
          value={`${REPORTS.filter((r) => r.grade === 'BUY').length}건`}
          description="매수 의견 리포트"
        />
        <StatCard
          label="커버 산업"
          value={`${new Set(REPORTS.map((r) => r.industry)).size}개`}
          description="반도체·2차전지·바이오·유통"
        />
        <StatCard label="최신 발행일" value={recentReports[0]?.publishedAt ?? '-'} description="가장 최근 리포트 기준" />
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900">최근 리포트</h2>
        <ul className="mt-3 divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
          {recentReports.map((report) => (
            <li key={report.id} className="p-4">
              <Link to={`/reports/${report.id}`} className="text-sm font-medium text-gray-900 hover:text-blue-600">
                {report.title}
              </Link>
              <p className="mt-1 text-xs text-gray-400">
                {report.companyName} · {report.industry} ·{' '}
                {dayjs(report.publishedAt).format('YYYY-MM-DD')}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default DashboardPage;
