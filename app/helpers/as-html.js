import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export function asHtml([fragment]) {
  return htmlSafe(PrismicDOM.RichText.asHtml(fragment));
}

export default helper(asHtml);
