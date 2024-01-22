import { config } from '../config/environment'

const buildRequestUrl = (easiConnectUrl, params) => {
  return `${easiConnectUrl}/webforms/2.0/script/1.0/${params.solutionId}/${params.formId}/${params.language}.js`
}

export function create(params) {
  const easiConnectUrl = config.easiware.scriptUrl

  const formFetchData = params

  if (!formFetchData.elementToBuildIn) {
    throw new Error('No element selected for Easiware form')
  }

  const targetElementForForm = document.getElementById(
    formFetchData.elementToBuildIn
  )

  if (params.callback && typeof params.callback === 'function') {
    window['fn_callback_easiwebform' + params.formId + params.solutionId] =
      params.callback
  }

  targetElementForForm.innerHTML = `
    <div id="easiformarea" />
    <div class="easiformWaiting" id="easiformWaiting">
      <div class="easiformWaitingCont" id="easiformWaitingCont">
        <div class="easiformWaitingMsg" id="easiformWaitingMsg" />
      </div>
    </div>
  `
  targetElementForForm.innerHTML +=
    '<div class="easiformWaiting" id="easiformWaiting">' +
    '<div class="easiformWaitingCont" id="easiformWaitingCont"><div class="easiformWaitingMsg" id="easiformWaitingMsg"></div></div>' +
    `<style type="text/css">
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

 #easiformarea {
  font-family: 'Roboto', Arial, sans-serif;
  line-height: 1.25;
  background-color: white;
  border-radius: 16px;
  padding:32px;
  max-width: 34rem;
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
  font-family: 'Roboto', Arial, sans-serif;
  border-radius: 100px;
  padding: 1rem 1.5rem;
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
  color: var(--pix-neutral-900);
  margin: 2rem 0;
}

#fld_CS_StudentBirth {
  font-family: 'Roboto', Arial, sans-serif;
  color: var(--pix-neutral-60);
  text-transform: uppercase;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--pix-neutral-45);
  border-radius: 0.25rem;
  font-size: 1rem;
}

#fld_AttachedFiles {
  font-family: 'Roboto', Arial, sans-serif;
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
#easiformWaiting {
    display: none;
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba( 255, 255, 255, .8) 50% 50% no-repeat;
}
    </style>` +
    '</div>'

  const asyncScript = document.createElement('script')
  asyncScript.type = 'text/javascript'
  asyncScript.src = buildRequestUrl(easiConnectUrl, params)
  targetElementForForm.appendChild(asyncScript)
}
