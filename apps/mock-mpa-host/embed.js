"use strict";var MazeloneChatWidget=(()=>{var g=Object.defineProperty;var U=Object.getOwnPropertyDescriptor;var N=Object.getOwnPropertyNames;var F=Object.prototype.hasOwnProperty;var O=(e,t)=>{for(var o in t)g(e,o,{get:t[o],enumerable:!0})},$=(e,t,o,c)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of N(t))!F.call(e,r)&&r!==o&&g(e,r,{get:()=>t[r],enumerable:!(c=U(t,r))||c.enumerable});return e};var B=e=>$(g({},"__esModule",{value:!0}),e);var se={};O(se,{init:()=>q});var G="https://navia.krs.co.kr/bridge-chat";var X={unreachable:"\uCC44\uD305 \uC11C\uBC84\uC5D0 \uC5F0\uACB0\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.<br />\uC11C\uBC84\uAC00 \uC2E4\uD589 \uC911\uC774 \uC544\uB2C8\uAC70\uB098 \uB124\uD2B8\uC6CC\uD06C\uC5D0 \uBB38\uC81C\uAC00 \uC788\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",timeout:"\uCC44\uD305\uC744 \uBD88\uB7EC\uC62C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.<br />\uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694."},l=null,n=null,a=null,d=null,M=()=>({content:document.body.innerHTML,contentType:"text/html"}),S=()=>({content:window.getSelection()?.toString().trim()??"",contentType:"text/plain"}),C=[],u="",m,h=null,E=0,I=!1,s=400,y=!1,T=!1,P="bottom-right",q=(e={})=>{if(T){console.warn("[MazeloneChatWidget] init()\uC774 \uC774\uBBF8 \uD638\uCD9C\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uC911\uBCF5 \uD638\uCD9C\uC740 \uBB34\uC2DC\uB429\uB2C8\uB2E4.");return}let t=e.chatAppUrl??G;d=new URL(t).origin,e.getPageContext&&(M=e.getPageContext),e.getSelectionContext&&(S=e.getSelectionContext),C=e.suggestionPrompts??[];let o=new URL(t);o.searchParams.set("parentOrigin",window.location.origin);let c=e.target??document.body,r=document.createElement("div");e.zIndex!=null&&r.style.setProperty("--widget-z-index",String(e.zIndex));let i=r.attachShadow({mode:"open"});i.innerHTML=ee(),c.appendChild(r),T=!0,n=i.querySelector(".panel"),a=i.querySelector(".toggle-btn"),l=i.querySelector(".iframe");let k=i.querySelector(".close-btn"),W=i.querySelector(".resize-handle"),D=i.querySelector(".retry-btn");h=i.querySelector(".error-message"),u=o.toString();let p=e.position??"bottom-right";P=p,a?.classList.add(p==="bottom-left"?"pos-left":"pos-right"),n?.classList.add(p==="bottom-left"?"pos-left":"pos-right"),e.offset?.bottom!=null&&a?.style.setProperty("--toggle-bottom",`${e.offset.bottom}px`),e.offset?.side!=null&&a?.style.setProperty("--toggle-side",`${e.offset.side}px`),s=b(400),n?.style.setProperty("--panel-width",`${s}px`),k?.addEventListener("click",()=>v(!1)),a?.addEventListener("click",()=>{let w=!I;v(w),w&&!y&&(y=!0,_())}),W?.addEventListener("pointerdown",j),D?.addEventListener("click",()=>{_()}),window.addEventListener("message",V),window.addEventListener("resize",Z),document.addEventListener("mouseup",Y)},b=e=>{let t=Math.min(800,window.innerWidth*.9);return Math.min(Math.max(e,320),t)},v=e=>{I=e,n?.classList.toggle("is-open",e),a?.classList.toggle("is-hidden",e)},f=0,z=0,j=e=>{e.preventDefault(),e.currentTarget.setPointerCapture(e.pointerId),l?.classList.add("is-resizing"),f=e.clientX,z=s,document.addEventListener("pointermove",A),document.addEventListener("pointerup",H),document.body.style.cursor="ew-resize",document.body.style.userSelect="none"},A=e=>{let t=P==="bottom-left"?e.clientX-f:f-e.clientX;s=b(z+t),n?.style.setProperty("--panel-width",`${s}px`)},H=()=>{l?.classList.remove("is-resizing"),document.removeEventListener("pointermove",A),document.removeEventListener("pointerup",H),document.body.style.cursor="",document.body.style.userSelect=""},Z=()=>{let e=b(s);e!==s&&(s=e,n?.style.setProperty("--panel-width",`${s}px`))},L=e=>{h&&(h.innerHTML=X[e]),n?.classList.remove("is-loading"),n?.classList.add("has-error")},K=async e=>{let t=new AbortController,o=window.setTimeout(()=>t.abort(),5e3);try{return await fetch(e,{method:"HEAD",mode:"no-cors",cache:"no-store",credentials:"omit",signal:t.signal}),!0}catch{return!1}finally{window.clearTimeout(o)}},_=async()=>{let e=++E;n?.classList.remove("has-error"),n?.classList.add("is-loading"),window.clearTimeout(m),l?.removeAttribute("src");let t=await K(u);if(e===E){if(!t){L("unreachable");return}l&&(l.src=u),m=window.setTimeout(()=>L("timeout"),8e3)}},V=e=>{if(!d||e.origin!==d)return;let t=e.data;t?.type==="widget:ready"?(window.clearTimeout(m),n?.classList.remove("has-error","is-loading"),x({type:"host:init",payload:{suggestionPrompts:C}})):t?.type==="widget:request-context"&&Q()},J=(e,t)=>{if(typeof e?.content=="string"&&typeof e?.contentType=="string")return e;throw new Error(`${t}\uAC00 { content: string; contentType: string } \uD615\uD0DC\uB97C \uBC18\uD658\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.`)},R=(e,t)=>{try{return J(e(),t)}catch(o){return console.warn(`[MazeloneChatWidget] ${t} \uCC98\uB9AC \uC911 \uC5D0\uB7EC\uAC00 \uBC1C\uC0DD\uD574 \uC774 \uBA54\uC2DC\uC9C0\uB294 \uBCF4\uB0B4\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`,o),null}},Q=()=>{let e=R(M,"getPageContext");e&&x({type:"host:context",payload:e})},Y=()=>{let e=R(S,"getSelectionContext");e?.content&&x({type:"host:selection",payload:{selectedContent:e.content,selectedContentType:e.contentType}})},x=e=>{!l?.contentWindow||!d||l.contentWindow.postMessage(e,d)},ee=()=>`
  <style>${te()}</style>
  <div class="panel">
    <div class="resize-handle"></div>
    <iframe class="iframe" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox" allow="clipboard-write"></iframe>
    <div class="loading-state">
      <div class="spinner"></div>
      <p class="loading-message">\uCC44\uD305\uC744 \uBD88\uB7EC\uC624\uB294 \uC911\uC785\uB2C8\uB2E4...</p>
    </div>
    <div class="error-state">
      ${re()}
      <p class="error-message"></p>
      <button type="button" class="retry-btn">\uB2E4\uC2DC \uC2DC\uB3C4</button>
    </div>
    <button type="button" class="close-btn" aria-label="\uCC44\uD305\uCC3D \uB2EB\uAE30">${ne()}</button>
  </div>
  <button type="button" class="toggle-btn" aria-label="\uCC44\uD305 \uC5F4\uAE30">${oe()}</button>
`,te=()=>`
  :host {
    all: initial;
  }

  .panel {
    position: fixed;
    top: 0;
    height: 100%;
    width: var(--panel-width, 400px);
    transition: transform 0.3s ease-in-out;
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -4px rgba(0, 0, 0, 0.1);
    background: #fff;
    z-index: var(--widget-z-index, 2147483647);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .panel.pos-right {
    right: 0;
    transform: translateX(100%);
    border-left: 1px solid oklch(0.929 0.013 255.508);
  }

  .panel.pos-left {
    left: 0;
    transform: translateX(-100%);
    border-right: 1px solid oklch(0.929 0.013 255.508);
  }

  .panel.is-open {
    transform: translateX(0);
  }

  .resize-handle {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 4px;
    background: transparent;
    cursor: ew-resize;
    touch-action: none;

    &:hover,
    &:active {
      background: oklch(0.929 0.013 255.508);
    }
  }

  .panel.pos-right .resize-handle {
    left: 0;
    transform: translateX(-50%);
  }

  .panel.pos-left .resize-handle {
    right: 0;
    transform: translateX(50%);
  }

  .close-btn {
    position: absolute;
    top: 10px;
    right: 16px;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    border-radius: 4px;
    opacity: 0.7;
    cursor: pointer;
    color: #6b7280;
    transition: opacity 0.15s ease;
    z-index: 1;
  }

  .close-btn:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.05);
  }

  .iframe {
    flex: 1;
    width: 100%;
    border: none;
  }

  .iframe.is-resizing {
    pointer-events: none;
  }

  .loading-state {
    display: none;
    position: absolute;
    inset: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    background: #fff;
    color: #6b7280;
  }

  .panel.is-loading .loading-state {
    display: flex;
  }

  .loading-message {
    margin: 0;
    font-size: 14px;
  }

  .spinner {
    width: 28px;
    height: 28px;
    border: 3px solid oklch(0.929 0.013 255.508);
    border-top-color: #2563eb;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .error-state {
    display: none;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 24px;
    text-align: center;
    color: #6b7280;
  }

  .panel.has-error .iframe {
    display: none;
  }

  .panel.has-error .error-state {
    display: flex;
  }

  .error-message {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
  }

  .retry-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    background: #2563eb;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
  }

  .toggle-btn {
    position: fixed;
    bottom: var(--toggle-bottom, 20px);
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: none;
    background: #2563eb;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    z-index: var(--widget-z-index, 2147483647);
  }

  .toggle-btn.pos-right {
    right: var(--toggle-side, 20px);
  }

  .toggle-btn.pos-left {
    left: var(--toggle-side, 20px);
  }

  .toggle-btn.is-hidden {
    display: none;
  }
`,oe=()=>`
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4h16v12H7l-3 3V4z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`,ne=()=>`
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>
`,re=()=>`
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 9v4m0 4h.01M10.29 3.86l-8.18 14.18A1 1 0 0 0 3 19.5h18a1 1 0 0 0 .89-1.46L13.71 3.86a1 1 0 0 0-1.72 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;return B(se);})();
//# sourceMappingURL=index.global.js.map