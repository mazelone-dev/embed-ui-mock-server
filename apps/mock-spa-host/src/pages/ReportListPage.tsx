import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import { REPORTS } from '@/constants/reports';
import { cn } from '@/lib/cn';

import type { ReportGrade, ReportIndustry } from '@/models/report';

const INDUSTRY_OPTIONS: Array<ReportIndustry | '전체'> = [
  '전체',
  '반도체',
  '2차전지',
  '바이오',
  '유통',
];
const GRADE_OPTIONS: Array<ReportGrade | '전체'> = ['전체', 'BUY', 'HOLD', 'SELL'];

const getGradeStyle = (grade: ReportGrade) =>
  cn(
    'rounded-full px-2 py-0.5 text-xs font-semibold',
    grade === 'BUY' && 'bg-blue-50 text-blue-600',
    grade === 'HOLD' && 'bg-gray-100 text-gray-600',
    grade === 'SELL' && 'bg-red-50 text-red-600'
  );

const ReportListPage = () => {
  const [industryFilter, setIndustryFilter] = useState<ReportIndustry | '전체'>('전체');
  const [gradeFilter, setGradeFilter] = useState<ReportGrade | '전체'>('전체');

  const filteredReports = useMemo(() => {
    return REPORTS.filter((report) => {
      const matchesIndustry = industryFilter === '전체' || report.industry === industryFilter;
      const matchesGrade = gradeFilter === '전체' || report.grade === gradeFilter;
      return matchesIndustry && matchesGrade;
    });
  }, [industryFilter, gradeFilter]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">리포트 목록</h1>
      <p className="mt-1 text-sm text-gray-500">산업·투자의견별로 리포트를 필터링해 확인하세요.</p>

      <div className="mt-6 flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500">산업</span>
          {INDUSTRY_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setIndustryFilter(option)}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium',
                industryFilter === option
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-gray-200 bg-white text-gray-600'
              )}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500">투자의견</span>
          {GRADE_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setGradeFilter(option)}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium',
                gradeFilter === option
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-gray-200 bg-white text-gray-600'
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
        {filteredReports.length === 0 ? (
          <p className="p-8 text-center text-sm text-gray-400">
            조건에 맞는 리포트가 없습니다.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">제목</th>
                <th className="px-4 py-3 font-medium">산업</th>
                <th className="px-4 py-3 font-medium">투자의견</th>
                <th className="px-4 py-3 font-medium">발행일</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredReports.map((report) => (
                <tr key={report.id}>
                  <td className="px-4 py-3">
                    <Link to={`/reports/${report.id}`} className="font-medium text-gray-900 hover:text-blue-600">
                      {report.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{report.industry}</td>
                  <td className="px-4 py-3">
                    <span className={getGradeStyle(report.grade)}>{report.grade}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {dayjs(report.publishedAt).format('YYYY-MM-DD')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ReportListPage;
