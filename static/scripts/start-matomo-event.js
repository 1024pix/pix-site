// eslint-disable-next-line no-var,no-use-before-define
var _mtm = _mtm || []

if (document.querySelector('script[data-matomo-debug-mode="true"]')) {
  _mtm.push(['enableDebugMode'])
}

_mtm.push({ 'mtm.startTime': new Date().getTime(), event: 'mtm.Start' })
