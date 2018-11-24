import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';
import PrismicDOM from 'prismic-dom';

export function asHtml([fragment]) {
  return htmlSafe(PrismicDOM.RichText.asHtml(fragment));
}

export default helper(asHtml);
