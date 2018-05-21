import { helper } from '@ember/component/helper';

export function asText([fragment]) {
  return PrismicDOM.RichText.asText(fragment);
}

export default helper(asText);
