import { helper } from '@ember/component/helper';

export function handleUrl(url) {
  var doc = document.createElement('a');
  doc.href = url;
  if(doc.hostname === 'pix.fr') {
    return doc.pathname;
  }
  return url;
}

export default helper(handleUrl);
