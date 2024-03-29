const buildRequestUrl = (easiConnectUrl, params) => {
  return `${easiConnectUrl}/webforms/2.0/script/1.0/${params.solutionId}/${params.formId}/${params.language}.js`;
};

export function create(params) {
  const runtimeConfig = useRuntimeConfig();
  const easiConnectUrl = runtimeConfig.public.easiwareScriptUrl;

  const formFetchData = params;

  if (!formFetchData.elementToBuildIn) {
    throw new Error('No element selected for Easiware form');
  }

  const targetElementForForm = document.getElementById(formFetchData.elementToBuildIn);

  if (params.callback && typeof params.callback === 'function') {
    window['fn_callback_easiwebform' + params.formId + params.solutionId] = params.callback;
  }

  targetElementForForm.innerHTML = `
  <div id='easiformarea'></div>
   <div id='easiformWaiting'>
</div>
`;
  targetElementForForm.innerHTML +=
    `<style type='text/css'>
:root {
--pix-neutral-900: #122647;
--pix-neutral-60: #5E6C84;
--pix-error-5: #FBECEC;
--pix-error-70: #952E2E;
--pix-error-500: #D24140;
--pix-neutral-45: #5E6C84;
--pix-primary-50: #613FDD;
--pix-primary-700: #452d9d;
--pix-primary-900: #291a5d;
}

[id^="easi_fielddiv"] {
display: flex;
flex-wrap: wrap;
}

[id^="easi_fielddiv"]:not(:first-child) {
margin-top: 1rem;
}

#easiformarea input[type="text"],
#easiformarea input[type="number"],
#easiformarea select,
#easiformarea textarea {
max-width: 100%;
padding: 0.5rem 0.75rem;
border: 1px solid var(--pix-neutral-45);
border-radius: 0.25rem;
font-size: 1rem;
color: var(--pix-neutral-900);
}

#easiformarea select {
background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0Ljk1IDEwIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZjt9LmNscy0ye2ZpbGw6IzQ0NDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPmFycm93czwvdGl0bGU+PHJlY3QgY2xhc3M9ImNscy0xIiB3aWR0aD0iNC45NSIgaGVpZ2h0PSIxMCIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIxLjQxIDQuNjcgMi40OCAzLjE4IDMuNTQgNC42NyAxLjQxIDQuNjciLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMy41NCA1LjMzIDIuNDggNi44MiAxLjQxIDUuMzMgMy41NCA1LjMzIi8+PC9zdmc+) no-repeat;
background-position: right 5px top;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
}

.mandatory {
order: 1;
min-width: 0.75em;
flex-shrink: 0;
color: var(--pix-error-500);
}

[id^="easi_labelspan"] {
color: var(--pix-neutral-900);
order: 2;
flex-grow: 1;
font-weight: 500;
margin-bottom: 0.5rem;
}

[id^="easi_fieldspan"] {
order: 4;
min-width: 100%;
}

[id^="easi_fieldspan"] > * {
min-width: 100%;
}

[id^="easi_fielhelpspan"] {
order: 3;
min-width: 100%;
font-size: 0;
margin-bottom: 0.5rem;
}

#easiformKBzone {
font-size: 0.875rem;
color: var(--pix-neutral-60);
}

.easiformKBZoneArticle {
padding: 0.5rem 0;
}

.easiformKBZoneArticle div {
display: inline;
color: var(--pix-primary-700);
text-decoration: underline;
cursor: pointer;
}

.easiformKBZoneArticle div:active {
color: var(--pix-primary-900);
}

.easiformKBZoneArticle::after {
display: inline-block;
content: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_5_2)'%3E%3Cpath d='M320 0C302.3 0 288 14.3 288 32C288 49.7 302.3 64 320 64H402.7L201.4 265.4C188.9 277.9 188.9 298.2 201.4 310.7C213.9 323.2 234.2 323.2 246.7 310.7L448 109.3V192C448 209.7 462.3 224 480 224C497.7 224 512 209.7 512 192V32C512 14.3 497.7 0 480 0H320ZM80 32C35.8 32 0 67.8 0 112V432C0 476.2 35.8 512 80 512H400C444.2 512 480 476.2 480 432V320C480 302.3 465.7 288 448 288C430.3 288 416 302.3 416 320V432C416 440.8 408.8 448 400 448H80C71.2 448 64 440.8 64 432V112C64 103.2 71.2 96 80 96H192C209.7 96 224 81.7 224 64C224 46.3 209.7 32 192 32H80Z' fill='%23452D9D'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_5_2'%3E%3Crect width='512' height='512' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
width: 0.875rem;
height: auto;
margin: 0 0.25rem;
}

[id^="easi_fielhelpspan"] .easitoolTipText {
font-size: 0.875rem;
color: var(--pix-neutral-60);
}


.validatebutton {
background-color: var(--pix-primary-50);
color: white;
font-family: inherit;
border-radius: 100px;
padding: 0.75rem 1.25rem;
border: 2px solid transparent;
font-size: 1.125rem;
margin-top: 1.5rem;
cursor: pointer;
}

.validatebutton:hover {
background-color: var(--pix-primary-700);

}

.validatebutton:active {
background-color: var(--pix-primary-900);
}

.mandatoryfieldmention {
display: none;
}

#fld_CS_StudentBirth {
color: var(--pix-neutral-60);
text-transform: uppercase;
padding: 0.5rem 0.75rem;
border: 1px solid var(--pix-neutral-45);
border-radius: 0.25rem;
font-size: 1rem;
}

#fld_AttachedFiles {
color: var(--pix-neutral-60);
}

[id^="recaptcha_message"] {
color: var(--pix-error-70);
background-color: var(--pix-error-5);
border: 1px solid var(--pix-error-70);
border-radius: 4px;
padding: 0.75rem 1rem;
font-weight: 500;
}
#easiformarea:empty::after {
  content: '⏳ Chargement du formulaire...';
  display: block;
  text-align: center;
  font-family: "Open Sans", Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
}
#easiformWaiting{
  position: absolute;
  inset: 0;
  opacity: 0.5;  
  background-color:white;
}
#easiformWaiting::after{
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 50px;
  transform: translate(-50%,-50%);
  background-size: contain;
  background-position: center center;
  background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHdpZHRoPSI0MHB4IiBoZWlnaHQ9IjQwcHgiIHZpZXdCb3g9IjAgMCA0MCA0MCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWw6c3BhY2U9InByZXNlcnZlIiBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEuNDE0MjE7IiB4PSIwcHgiIHk9IjBweCI+CiAgICA8ZGVmcz4KICAgICAgICA8c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWwogICAgICAgICAgICBALXdlYmtpdC1rZXlmcmFtZXMgc3BpbiB7CiAgICAgICAgICAgICAgZnJvbSB7CiAgICAgICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDBkZWcpCiAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIHRvIHsKICAgICAgICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTM1OWRlZykKICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgQGtleWZyYW1lcyBzcGluIHsKICAgICAgICAgICAgICBmcm9tIHsKICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpCiAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIHRvIHsKICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC0zNTlkZWcpCiAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIHN2ZyB7CiAgICAgICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IDUwJSA1MCU7CiAgICAgICAgICAgICAgICAtd2Via2l0LWFuaW1hdGlvbjogc3BpbiAxLjVzIGxpbmVhciBpbmZpbml0ZTsKICAgICAgICAgICAgICAgIC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuOwogICAgICAgICAgICAgICAgYW5pbWF0aW9uOiBzcGluIDEuNXMgbGluZWFyIGluZmluaXRlOwogICAgICAgICAgICB9CiAgICAgICAgXV0+PC9zdHlsZT4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJvdXRlciI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMCwwQzIyLjIwNTgsMCAyMy45OTM5LDEuNzg4MTMgMjMuOTkzOSwzLjk5MzlDMjMuOTkzOSw2LjE5OTY4IDIyLjIwNTgsNy45ODc4MSAyMCw3Ljk4NzgxQzE3Ljc5NDIsNy45ODc4MSAxNi4wMDYxLDYuMTk5NjggMTYuMDA2MSwzLjk5MzlDMTYuMDA2MSwxLjc4ODEzIDE3Ljc5NDIsMCAyMCwwWiIgc3R5bGU9ImZpbGw6YmxhY2s7Ii8+CiAgICAgICAgPC9nPgogICAgICAgIDxnPgogICAgICAgICAgICA8cGF0aCBkPSJNNS44NTc4Niw1Ljg1Nzg2QzcuNDE3NTgsNC4yOTgxNSA5Ljk0NjM4LDQuMjk4MTUgMTEuNTA2MSw1Ljg1Nzg2QzEzLjA2NTgsNy40MTc1OCAxMy4wNjU4LDkuOTQ2MzggMTEuNTA2MSwxMS41MDYxQzkuOTQ2MzgsMTMuMDY1OCA3LjQxNzU4LDEzLjA2NTggNS44NTc4NiwxMS41MDYxQzQuMjk4MTUsOS45NDYzOCA0LjI5ODE1LDcuNDE3NTggNS44NTc4Niw1Ljg1Nzg2WiIgc3R5bGU9ImZpbGw6cmdiKDIxMCwyMTAsMjEwKTsiLz4KICAgICAgICA8L2c+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMCwzMi4wMTIyQzIyLjIwNTgsMzIuMDEyMiAyMy45OTM5LDMzLjgwMDMgMjMuOTkzOSwzNi4wMDYxQzIzLjk5MzksMzguMjExOSAyMi4yMDU4LDQwIDIwLDQwQzE3Ljc5NDIsNDAgMTYuMDA2MSwzOC4yMTE5IDE2LjAwNjEsMzYuMDA2MUMxNi4wMDYxLDMzLjgwMDMgMTcuNzk0MiwzMi4wMTIyIDIwLDMyLjAxMjJaIiBzdHlsZT0iZmlsbDpyZ2IoMTMwLDEzMCwxMzApOyIvPgogICAgICAgIDwvZz4KICAgICAgICA8Zz4KICAgICAgICAgICAgPHBhdGggZD0iTTI4LjQ5MzksMjguNDkzOUMzMC4wNTM2LDI2LjkzNDIgMzIuNTgyNCwyNi45MzQyIDM0LjE0MjEsMjguNDkzOUMzNS43MDE5LDMwLjA1MzYgMzUuNzAxOSwzMi41ODI0IDM0LjE0MjEsMzQuMTQyMUMzMi41ODI0LDM1LjcwMTkgMzAuMDUzNiwzNS43MDE5IDI4LjQ5MzksMzQuMTQyMUMyNi45MzQyLDMyLjU4MjQgMjYuOTM0MiwzMC4wNTM2IDI4LjQ5MzksMjguNDkzOVoiIHN0eWxlPSJmaWxsOnJnYigxMDEsMTAxLDEwMSk7Ii8+CiAgICAgICAgPC9nPgogICAgICAgIDxnPgogICAgICAgICAgICA8cGF0aCBkPSJNMy45OTM5LDE2LjAwNjFDNi4xOTk2OCwxNi4wMDYxIDcuOTg3ODEsMTcuNzk0MiA3Ljk4NzgxLDIwQzcuOTg3ODEsMjIuMjA1OCA2LjE5OTY4LDIzLjk5MzkgMy45OTM5LDIzLjk5MzlDMS43ODgxMywyMy45OTM5IDAsMjIuMjA1OCAwLDIwQzAsMTcuNzk0MiAxLjc4ODEzLDE2LjAwNjEgMy45OTM5LDE2LjAwNjFaIiBzdHlsZT0iZmlsbDpyZ2IoMTg3LDE4NywxODcpOyIvPgogICAgICAgIDwvZz4KICAgICAgICA8Zz4KICAgICAgICAgICAgPHBhdGggZD0iTTUuODU3ODYsMjguNDkzOUM3LjQxNzU4LDI2LjkzNDIgOS45NDYzOCwyNi45MzQyIDExLjUwNjEsMjguNDkzOUMxMy4wNjU4LDMwLjA1MzYgMTMuMDY1OCwzMi41ODI0IDExLjUwNjEsMzQuMTQyMUM5Ljk0NjM4LDM1LjcwMTkgNy40MTc1OCwzNS43MDE5IDUuODU3ODYsMzQuMTQyMUM0LjI5ODE1LDMyLjU4MjQgNC4yOTgxNSwzMC4wNTM2IDUuODU3ODYsMjguNDkzOVoiIHN0eWxlPSJmaWxsOnJnYigxNjQsMTY0LDE2NCk7Ii8+CiAgICAgICAgPC9nPgogICAgICAgIDxnPgogICAgICAgICAgICA8cGF0aCBkPSJNMzYuMDA2MSwxNi4wMDYxQzM4LjIxMTksMTYuMDA2MSA0MCwxNy43OTQyIDQwLDIwQzQwLDIyLjIwNTggMzguMjExOSwyMy45OTM5IDM2LjAwNjEsMjMuOTkzOUMzMy44MDAzLDIzLjk5MzkgMzIuMDEyMiwyMi4yMDU4IDMyLjAxMjIsMjBDMzIuMDEyMiwxNy43OTQyIDMzLjgwMDMsMTYuMDA2MSAzNi4wMDYxLDE2LjAwNjFaIiBzdHlsZT0iZmlsbDpyZ2IoNzQsNzQsNzQpOyIvPgogICAgICAgIDwvZz4KICAgICAgICA8Zz4KICAgICAgICAgICAgPHBhdGggZD0iTTI4LjQ5MzksNS44NTc4NkMzMC4wNTM2LDQuMjk4MTUgMzIuNTgyNCw0LjI5ODE1IDM0LjE0MjEsNS44NTc4NkMzNS43MDE5LDcuNDE3NTggMzUuNzAxOSw5Ljk0NjM4IDM0LjE0MjEsMTEuNTA2MUMzMi41ODI0LDEzLjA2NTggMzAuMDUzNiwxMy4wNjU4IDI4LjQ5MzksMTEuNTA2MUMyNi45MzQyLDkuOTQ2MzggMjYuOTM0Miw3LjQxNzU4IDI4LjQ5MzksNS44NTc4NloiIHN0eWxlPSJmaWxsOnJnYig1MCw1MCw1MCk7Ii8+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K');
}
  </style>` + '</div>';

  const asyncScript = document.createElement('script');
  asyncScript.type = 'text/javascript';
  asyncScript.src = buildRequestUrl(easiConnectUrl, params);
  targetElementForForm.appendChild(asyncScript);
}
