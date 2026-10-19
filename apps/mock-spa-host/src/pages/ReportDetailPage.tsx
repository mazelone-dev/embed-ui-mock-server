import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import { REPORTS } from '@/constants/reports';
import { cn } from '@/lib/cn';

import type { ReportGrade } from '@/models/report';

const getGradeStyle = (grade: ReportGrade) =>
  cn(
    'rounded-full px-3 py-1 text-sm font-semibold',
    grade === 'BUY' && 'bg-blue-50 text-blue-600',
    grade === 'HOLD' && 'bg-gray-100 text-gray-600',
    grade === 'SELL' && 'bg-red-50 text-red-600'
  );

const ReportDetailPage = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const report = REPORTS.find((item) => item.id === reportId);

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white py-24 text-center">
        <p className="text-lg font-semibold text-gray-900">리포트를 찾을 수 없습니다.</p>
        <p className="mt-2 text-sm text-gray-500">
          요청하신 리포트가 삭제되었거나 잘못된 주소일 수 있습니다.
        </p>
        <Link to="/reports" className="mt-6 text-sm font-medium text-blue-600 hover:underline">
          리포트 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/reports" className="text-sm text-gray-500 hover:text-blue-600">
        ← 리포트 목록
      </Link>

      <div className="mt-3 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{report.title}</h1>
          <p className="mt-1 text-sm text-gray-500">
            {report.companyName} · {report.industry} ·{' '}
            {dayjs(report.publishedAt).format('YYYY-MM-DD')}
          </p>
        </div>
        <span className={getGradeStyle(report.grade)}>{report.grade}</span>
      </div>

      <p className="mt-6 rounded-xl bg-blue-50 p-4 text-sm text-blue-900">{report.summary}</p>

      <section className="mt-6 space-y-4">
        {report.body.map((paragraph, index) => (
          <p key={index} className="text-sm leading-relaxed text-gray-700">
            {paragraph}
          </p>
        ))}
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900">재무 요약</h2>
        <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-xs text-gray-500">매출액</p>
            <p className="mt-1 font-semibold text-gray-900">{report.financials.revenue}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-xs text-gray-500">영업이익</p>
            <p className="mt-1 font-semibold text-gray-900">{report.financials.operatingProfit}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-xs text-gray-500">순이익</p>
            <p className="mt-1 font-semibold text-gray-900">{report.financials.netProfit}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-xs text-gray-500">PER</p>
            <p className="mt-1 font-semibold text-gray-900">{report.financials.per}</p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900">투자 전망</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">{report.outlook}</p>
      </section>
    </div>
  );
};

export default ReportDetailPage;
