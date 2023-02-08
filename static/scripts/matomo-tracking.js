/* eslint-disable */
var _paq = window._paq = window._paq || [];
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function() {
  var u="https://analytics.pix.fr/"
  _paq.push(['setTrackerUrl', u+'matomo.php']);

  var globalSiteId = document.querySelector('script[data-matomo-tracking="true"]').getAttribute('data-global-site-id');
  var fwbSiteId = document.querySelector('script[data-matomo-tracking="true"]').getAttribute('data-fwb-site-id');

  if (window.location.toString().includes("fr-be")){
    _paq.push(['setSiteId', fwbSiteId]);
  } else {
    _paq.push(['setSiteId', globalSiteId]);
  }
  var d=document; g=d.createElement('script'); s=d.getElementsByTagName('script')[0];
  g.async=true;
  g.src=u+'matomo.js';
  s.parentNode.insertBefore(g,s);
})()
