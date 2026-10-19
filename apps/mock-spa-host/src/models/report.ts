export interface ReportFinancials {
  revenue: string;
  operatingProfit: string;
  netProfit: string;
  per: string;
}

export interface ReportModel {
  id: string;
  title: string;
  companyName: string;
  industry: ReportIndustry;
  grade: ReportGrade;
  publishedAt: string;
  summary: string;
  body: string[];
  financials: ReportFinancials;
  outlook: string;
}

export type ReportIndustry = '반도체' | '2차전지' | '바이오' | '유통';
export type ReportGrade = 'BUY' | 'HOLD' | 'SELL';
