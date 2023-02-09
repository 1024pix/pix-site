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
var globalContainer = document.querySelector('script[data-matomo-tracking="true"]').getAttribute('data-global-container');
var fwbContainer = document.querySelector('script[data-matomo-tracking="true"]').getAttribute('data-fwb-container');

var _mtm = window._mtm = window._mtm || [];
_mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
g.async=true;
if (window.location.toString().includes("fr-be")){
  g.src='https://analytics.pix.fr/js/container_'+fwbContainer+'.js';
} else {
  g.src='https://analytics.pix.fr/js/container_'+globalContainer+'.js';
}

s.parentNode.insertBefore(g,s);
