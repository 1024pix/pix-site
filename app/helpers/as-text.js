import { helper } from '@ember/component/helper';
import PrismicDOM from 'prismic-dom';

export function asText([fragment]) {
  try {
    return PrismicDOM.RichText.asText(fragment);
  } catch (e) {
    return null;
  }
}

export default helper(asText);
