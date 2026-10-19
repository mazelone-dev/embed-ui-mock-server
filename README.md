# Embed UI Mock Server

임베드 채팅 위젯(`embed.js`)을 붙여 볼 수 있는 테스트용 host 사이트 모음입니다.
고객사 페이지처럼 `embed.js`를 불러오고 `init()`을 호출하는 방식 그대로 위젯을 확인할 수 있습니다.

## 실행 방법

각 앱은 독립 프로젝트입니다. 확인할 앱 폴더로 이동해 설치한 뒤 실행합니다.

```bash
# 정적 HTML 사이트 (MPA) → http://localhost:4000
cd apps/mock-mpa-host
pnpm i
pnpm dev

# React SPA 사이트 → http://localhost:4001
cd apps/mock-spa-host
pnpm i
pnpm dev
```

브라우저에서 위 주소를 열면 화면 우하단에 플로팅 버튼이 보이고, 누르면 채팅 패널(iframe)이 열립니다.

| 앱                   | 구성                                      | 포트 | `embed.js` 위치                      |
| -------------------- | ----------------------------------------- | ---- | ------------------------------------ |
| `apps/mock-mpa-host`     | 순수 HTML/JS, 여러 페이지(MPA)            | 4000 | `apps/mock-mpa-host/embed.js`            |
| `apps/mock-spa-host` | Vite + React + TS, 클라이언트 라우팅(SPA) | 4001 | `apps/mock-spa-host/public/embed.js` |

<br/>

## iframe 주소 (배포 / 로컬)

**지금 들어 있는 `embed.js`는 배포된 Navia(`https://navia.krs.co.kr/bridge-chat`)를 바라봅니다.**
그대로 실행하면 운영 채팅 앱이 iframe에 뜹니다.

로컬에서 띄운 `navia-ver2-web`을 바라보게 하려면 아래 방법 이용하세요.
로컬 `navia-ver2-web`(`npm run dev`, 기본 `http://localhost:5173`)을 먼저 실행해 두어야 합니다.

### `init()`에 `chatAppUrl` 넘기기

`embed.js`는 연동 가이드에는 없는 `chatAppUrl` 옵션을 받습니다. 넘기면 기본 주소 대신 이 주소를 iframe으로 띄우고,
postMessage origin 검증도 이 주소의 origin으로 바뀝니다. 빌드 파일을 건드리지 않아도 됩니다.

```js
window.MazeloneChatWidget.init({
  chatAppUrl: "http://localhost:5173/bridge-chat",
  suggestionPrompts: [
    /* ... */
  ],
});
```

`init()` 호출 위치는 아래와 같습니다. 확인하려는 페이지마다 바꿔 주세요.

- `apps/mock-mpa-host/*.html` — 각 HTML 파일 하단 (`index`, `about`, `services`, `notice`, `faq`)
- `apps/mock-spa-host/index.html`

<br/>

## 연동 방식 요약

자세한 내용은 [임베드 채팅 위젯 연동 가이드](docs/임베드_채팅_위젯_연동_가이드.pdf)를 참고하세요. 이 레포의 페이지들도 같은 방식으로 붙어 있습니다.

```html
<script src="/path/to/embed.js" defer></script>
<script>
  window.addEventListener("DOMContentLoaded", () => {
    window.MazeloneChatWidget.init();
  });
</script>
```

`init()` 옵션 (모두 선택 사항):

| 옵션                  | 타입                                 | 기본값                                  | 설명                                       |
| --------------------- | ------------------------------------ | --------------------------------------- | ------------------------------------------ |
| `position`            | `'bottom-left' \| 'bottom-right'`    | `'bottom-right'`                        | 토글 버튼 위치. 패널도 같은 쪽에서 열림    |
| `offset`              | `{ bottom?: number; side?: number }` | `{ bottom: 20, side: 20 }`              | 토글 버튼 여백(px)                         |
| `zIndex`              | `number`                             | `2147483647`                            | 위젯(버튼 + 패널)의 z-index                |
| `suggestionPrompts`   | `string[]`                           | `[]`                                    | 첫 오픈 시 보여줄 예시 질문                |
| `getPageContext`      | `() => { content; contentType }`     | `document.body.innerHTML` (`text/html`) | 채팅 컨텍스트로 보낼 페이지 내용           |
| `getSelectionContext` | `() => { content; contentType }`     | 선택 텍스트 (`text/plain`)              | 드래그 선택 내용 가공                      |
| `chatAppUrl`          | `string`                             | `https://navia.krs.co.kr/bridge-chat`   | iframe 주소 (가이드 미기재, 로컬 테스트용) |

<br/>

## 문제 해결

| 증상                                 | 확인할 내용                                                                                   |
| ------------------------------------ | --------------------------------------------------------------------------------------------- |
| 버튼이 안 보인다                     | 네트워크 탭에서 `embed.js`가 404가 아닌지, 콘솔 오류가 없는지 확인                            |
| "채팅 서버에 연결할 수 없습니다"     | iframe 주소의 서버가 떠 있는지 확인. 로컬 주소로 바꿨다면 `navia-ver2-web`이 실행 중인지 확인 |
| "채팅을 불러올 수 없습니다"          | 서버는 응답했지만 8초 안에 채팅 UI가 준비되지 않음. 잠시 후 "다시 시도"                       |
| 콘솔: "init()이 이미 호출되었습니다" | 한 페이지에서 `init()`이 두 번 이상 호출됨. 동작에는 영향 없음                                |
