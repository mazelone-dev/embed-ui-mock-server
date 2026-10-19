// 모든 페이지에 공통으로 로드되는 스크립트. 고정 헤더 스크롤 그림자와
// 맨 위로 버튼의 표시/이동을 담당한다. 위젯(embed.js)과는 무관하게 독립 동작한다.
const header = document.querySelector('.site-header');
const backToTopBtn = document.querySelector('.back-to-top');

const SCROLL_THRESHOLD = 80;

const handleScroll = () => {
  const scrolled = window.scrollY > SCROLL_THRESHOLD;
  header?.classList.toggle('is-scrolled', scrolled);
  backToTopBtn?.classList.toggle('is-visible', scrolled);
};

backToTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', handleScroll);
handleScroll();
