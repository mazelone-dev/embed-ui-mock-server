# Embed UI Mock Server

임베드 채팅 위젯(`embed.js`)을 붙여 볼 수 있는 테스트용 host 사이트 모음입니다.
고객사 페이지처럼 `embed.js`를 불러오고 `init()`을 호출하는 방식 그대로 위젯을 확인할 수 있습니다.

## 실행 방법

`embed.js`의 iframe은 **로컬 Navia(`http://localhost:5173/bridge-chat`)** 를 바라봅니다.
따라서 mock 사이트를 띄우기 전에 아래 FE·BE를 먼저 로컬에서 실행해 두어야 합니다.

### 1. 사전 실행: Navia FE / BE

| 구분 | 레포                                                                                           | 브랜치       | 포트 |
| ---- | ---------------------------------------------------------------------------------------------- | ------------ | ---- |
| FE   | [`navia-ver2-web`](https://github.com/koreanregister-int-it-common/navia-ver2-web)             | `main_navia` | 5173 |
| BE   | [`navia-ver2-api`](https://github.com/koreanregister-int-it-common/navia-ver2-api/tree/develop) | `develop`    | 5000 |

```bash
# FE (navia-ver2-web) → http://localhost:5173
git checkout main_navia
npm i
npm run dev:navia
```

> FE를 5173이 아닌 포트로 띄웠다면 `init()`의 `chatAppUrl`로 주소를 바꿔 주세요. ([iframe 주소](#iframe-주소-로컬--배포) 참고)

BE(`navia-ver2-api`)는 `develop` 브랜치에서 해당 레포 README의 [빠른 시작](https://github.com/koreanregister-int-it-common/navia-ver2-api/blob/develop/README.md#%EB%B9%A0%EB%A5%B8-%EC%8B%9C%EC%9E%91)을 따라 실행합니다. (기본 포트 `5000`, 로컬 설정 `config_name=mzo`)

```bat
:: BE (navia-ver2-api, Windows cmd) → http://localhost:5000
git checkout develop
.\.venv\Scripts\activate
set config_name=mzo
set LOG_DIR=./logs
python server.py
```

### 2. mock host 사이트 실행

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
| `apps/mock-mpa-host` | 순수 HTML/JS, 여러 페이지(MPA)            | 4000 | `apps/mock-mpa-host/embed.js`        |
| `apps/mock-spa-host` | Vite + React + TS, 클라이언트 라우팅(SPA) | 4001 | `apps/mock-spa-host/public/embed.js` |

<br/>

## iframe 주소 (로컬 / 배포)

**지금 들어 있는 `embed.js`는 로컬 `navia-ver2-web`(`http://localhost:5173/bridge-chat`)을 바라봅니다.**
배포된 Navia(`https://navia.krs.co.kr/bridge-chat`)를 띄우거나, 로컬 FE를 5173이 아닌 다른 포트로 실행했다면 아래처럼 `chatAppUrl`을 바꿔 주세요.
(예: FE를 3000 포트로 띄웠다면 `chatAppUrl: "http://localhost:3000/bridge-chat"`)

> **배포 환경에는 이 레포의 `embed.js`를 사용하지 마세요.**
> 이 레포의 `embed.js`는 로컬 테스트용으로 `http://localhost:5173`을 바라보도록 빌드되어 있습니다.
> 실제 사이트에 적용할 때는 **메일로 전달드린 `embed.js` 스크립트**를 사용해 주세요.

### `init()`에 `chatAppUrl` 넘기기

`embed.js`는 연동 가이드에는 없는 `chatAppUrl` 옵션을 받습니다. 넘기면 기본 주소 대신 이 주소를 iframe으로 띄우고,
postMessage origin 검증도 이 주소의 origin으로 바뀝니다. 빌드 파일을 건드리지 않아도 됩니다.

```js
window.MazeloneChatWidget.init({
  chatAppUrl: "https://navia.krs.co.kr/bridge-chat",
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
| `chatAppUrl`          | `string`                             | `http://localhost:5173/bridge-chat`     | iframe 주소 (가이드 미기재, 테스트용)      |

<br/>

## 문제 해결

| 증상                                 | 확인할 내용                                                                                   |
| ------------------------------------ | --------------------------------------------------------------------------------------------- |
| 버튼이 안 보인다                     | 네트워크 탭에서 `embed.js`가 404가 아닌지, 콘솔 오류가 없는지 확인                            |
| "채팅 서버에 연결할 수 없습니다"     | 로컬 `navia-ver2-web`(5173)·`navia-ver2-api`(5000)가 실행 중인지 확인 |
| "채팅을 불러올 수 없습니다"          | 서버는 응답했지만 8초 안에 채팅 UI가 준비되지 않음. 잠시 후 "다시 시도"                       |
| 콘솔: "init()이 이미 호출되었습니다" | 한 페이지에서 `init()`이 두 번 이상 호출됨. 동작에는 영향 없음                                |
