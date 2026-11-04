import { fireEvent, screen, within } from '@testing-library/vue';
import { mockNuxtImport, renderSuspended } from '@nuxt/test-utils/runtime';
import { ref } from 'vue';

import NewsPage from '../../../../../shared/pages/news/index.vue';

function buildNewsItem({ uid, title, tags }) {
  return {
    uid,
    tags,
    data: {
      title: [{ text: title }],
      category: 'Announcement',
      date: '2026-10-21',
      excerpt: [],
      illustration: {},
    },
  };
}

const newsItems = [
  buildNewsItem({ uid: 'news-ia-education', title: 'News IA et Éducation', tags: ['tag-IA', 'tag-Éducation'] }),
  buildNewsItem({ uid: 'news-education', title: 'News Éducation', tags: ['tag-Éducation'] }),
  buildNewsItem({ uid: 'news-cyber-ia', title: 'News Cybersécurité et IA', tags: ['tag-Cybersécurité', 'tag-IA'] }),
  buildNewsItem({ uid: 'news-emploi', title: 'News Emploi', tags: ['tag-Emploi'] }),
  buildNewsItem({ uid: 'news-autres', title: 'News Autres', tags: ['pas-de-tag'] }),

];

const { getAllByType } = vi.hoisted(() => ({ getAllByType: vi.fn() }));

mockNuxtImport('usePrismic', () => {
  return () => ({ client: { getAllByType } });
});

mockNuxtImport('useI18n', () => {
  return () => ({ locale: ref('fr-fr'), t: str => str });
});

function getNewsCard(title) {
  return screen.queryByRole('heading', { level: 3, name: title });
}

function getAllNewsCards() {
  return screen.queryAllByRole('heading', { level: 3 });
}

function getFilterButton(name) {
  const filters = screen.getByRole('list', { name: 'news-page-filter-label' });
  return within(filters).getByRole('button', { name });
}

describe('Integration | Pages | news', () => {
  beforeEach(async () => {
    getAllByType.mockResolvedValue(newsItems);
    await renderSuspended(NewsPage);
  });

  test('displays the 5 news cards and one filter per tag by default', () => {
    // then
    expect(getAllNewsCards()).toHaveLength(5);
    expect(getNewsCard('News IA et Éducation')).toBeTruthy();
    expect(getNewsCard('News Éducation')).toBeTruthy();
    expect(getNewsCard('News Cybersécurité et IA')).toBeTruthy();
    expect(getNewsCard('News Emploi')).toBeTruthy();
    expect(getNewsCard('News Autres')).toBeTruthy();

    const filters = screen.getByRole('list', { name: 'news-page-filter-label' });
    const filterNames = within(filters)
      .getAllByRole('button')
      .map(button => button.textContent.trim());
    expect(filterNames).toEqual(['IA', 'Éducation', 'Cybersécurité', 'Emploi']);
  });

  test('displays only the 2 news cards tagged "IA" when selecting the "IA" filter', async () => {
    // when
    await fireEvent.click(getFilterButton('IA'));

    // then
    expect(getFilterButton('IA').getAttribute('aria-pressed')).toBe('true');
    expect(getAllNewsCards()).toHaveLength(2);
    expect(getNewsCard('News IA et Éducation')).toBeTruthy();
    expect(getNewsCard('News Cybersécurité et IA')).toBeTruthy();
    expect(getNewsCard('News Éducation')).toBeNull();
    expect(getNewsCard('News Emploi')).toBeNull();
    expect(getNewsCard('News Autres')).toBeNull();
  });

  test('displays only the 1 news card tagged "Emploi" when selecting the "Emploi" filter', async () => {
    // when
    await fireEvent.click(getFilterButton('Emploi'));

    // then
    expect(getAllNewsCards()).toHaveLength(1);
    expect(getNewsCard('News Emploi')).toBeTruthy();
    expect(getNewsCard('News IA et Éducation')).toBeNull();
    expect(getNewsCard('News Éducation')).toBeNull();
    expect(getNewsCard('News Cybersécurité et IA')).toBeNull();
    expect(getNewsCard('News Autres')).toBeNull();
  });

  test('replaces the displayed news cards when selecting another filter', async () => {
    // given
    await fireEvent.click(getFilterButton('IA'));

    // when
    await fireEvent.click(getFilterButton('Éducation'));

    // then
    expect(getFilterButton('IA').getAttribute('aria-pressed')).toBe('false');
    expect(getFilterButton('Éducation').getAttribute('aria-pressed')).toBe('true');
    expect(getAllNewsCards()).toHaveLength(2);
    expect(getNewsCard('News IA et Éducation')).toBeTruthy();
    expect(getNewsCard('News Éducation')).toBeTruthy();
    expect(getNewsCard('News Cybersécurité et IA')).toBeNull();
    expect(getNewsCard('News Emploi')).toBeNull();
    expect(getNewsCard('News Autres')).toBeNull();
  });

  test('displays all the news cards again when unselecting the filter', async () => {
    // given
    await fireEvent.click(getFilterButton('Emploi'));
    expect(getAllNewsCards()).toHaveLength(1);

    // when
    await fireEvent.click(getFilterButton('Emploi'));

    // then
    expect(getFilterButton('Emploi').getAttribute('aria-pressed')).toBe('false');
    expect(getAllNewsCards()).toHaveLength(5);
    expect(getNewsCard('News IA et Éducation')).toBeTruthy();
    expect(getNewsCard('News Éducation')).toBeTruthy();
    expect(getNewsCard('News Cybersécurité et IA')).toBeTruthy();
    expect(getNewsCard('News Emploi')).toBeTruthy();
    expect(getNewsCard('News Autres')).toBeTruthy();
  });
});
