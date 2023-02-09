/* eslint-disable */

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
