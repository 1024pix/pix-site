import { helper } from '@ember/component/helper';
import PrismicDOM from 'prismic-dom';

export function asText([fragment]) {
  return PrismicDOM.RichText.asText(fragment);
}

export default helper(asText);
