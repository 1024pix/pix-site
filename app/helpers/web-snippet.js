import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';

export function webSnippet([params]) {
  if (!(params && params[0] && params[0]['primary'] && params[0]['primary']['code'])) return;

  const result = params[0]['primary']['code'].map(code => code.text);

  return htmlSafe(result.join(' '));
}

export default helper(webSnippet);
