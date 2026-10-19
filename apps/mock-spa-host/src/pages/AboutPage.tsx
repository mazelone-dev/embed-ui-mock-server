const AboutPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">서비스 소개</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-700">
        한빛리서치는 반도체·2차전지·바이오·유통 등 주요 산업의 리포트를
        제공하는 산업 리포트 대시보드입니다. 애널리스트가 작성한 리포트를
        산업·투자의견별로 필터링해 찾아보고, 재무 요약과 투자 전망을
        한눈에 확인할 수 있습니다.
      </p>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-700">
        우하단 채팅 위젯을 통해 특정 리포트에 대해 질문하면, 현재 보고 있는
        리포트 내용을 바탕으로 답변을 받을 수 있습니다.
      </p>
    </div>
  );
};

export default AboutPage;
