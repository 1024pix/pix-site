import { vi } from 'vitest';
import { allowRootPagePrerender } from '../../services/allow-root-page-prerender';

describe('AllowRootPagePrerender', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe('when is international domain', () => {
    it('should remove only the root path rule added by i18n from prerender ignore list', function () {
      // given
      vi.stubEnv('SITE_DOMAIN', 'ORG');
      const otherRule = /^\/foo$/;
      const nitro = { options: { prerender: { ignore: [/^\/$/, otherRule, '/bar'] } } };

      // when
      allowRootPagePrerender(nitro);

      // then
      expect(nitro.options.prerender.ignore).toEqual([otherRule, '/bar']);
    });
  });

  describe('when is french domain', () => {
    it('should leave the prerender ignore list as is', function () {
      // given
      vi.stubEnv('SITE_DOMAIN', 'FR');
      const rootRule = /^\/$/;
      const nitro = { options: { prerender: { ignore: [rootRule] } } };

      // when
      allowRootPagePrerender(nitro);

      // then
      expect(nitro.options.prerender.ignore).toEqual([rootRule]);
    });
  });
});
