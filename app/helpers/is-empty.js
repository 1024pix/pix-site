import { helper } from '@ember/component/helper';
import { isEmpty } from '@ember/utils';

export default helper(function ([fragment]) {
  if (!fragment || fragment.length === 0) return true;
  if (fragment.length > 1) return false;
  return isEmpty(fragment[0].text);
})
