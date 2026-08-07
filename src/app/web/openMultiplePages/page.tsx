'use client';

import { useMemo, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const OPEN_DELAY_MS = 200;

export default function OpenMultiplePagesPage() {
  const { translations } = useLanguage();
  const openMultiplePagesTexts = translations.openMultiplePages;
  const [pattern, setPattern] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(10);
  const [listedPages, setListedPages] = useState('');

  const endPage = useMemo(() => {
    return currentPage + Math.max(pageCount, 1) - 1;
  }, [currentPage, pageCount]);

  const urls = useMemo(() => {
    const normalizedPattern = pattern.trim();
    if (!normalizedPattern) {
      return [];
    }

    return Array.from({ length: Math.max(pageCount, 1) }, (_, index) => {
      const page = currentPage + index;
      if (normalizedPattern.includes('{page}')) {
        return normalizedPattern.replaceAll('{page}', String(page));
      }

      return `${normalizedPattern}${page}`;
    });
  }, [pattern, currentPage, pageCount]);

  const handleList = () => {
    setListedPages(urls.join('\n'));
  };

  const handleOpen = () => {
    if (urls.length === 0) {
      return;
    }

    urls.forEach((url, index) => {
      setTimeout(() => {
        window.open(url, '_blank', 'noopener,noreferrer');
      }, index * OPEN_DELAY_MS);
    });

    setCurrentPage((previousPage) => previousPage + Math.max(pageCount, 1));
  };

  return (
    <main className="h-full w-full pl-6 pt-2">
      <section>
        <h1 className="text-3xl font-semibold text-gray-900">
          {translations.topMenus.openMultiplePages}
        </h1>

        <div className="mt-4 space-y-4 rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-4">
            <span className="w-56 text-sm font-medium text-gray-700">
              {openMultiplePagesTexts.webPagePattern}
            </span>

            <div className="flex flex-1 items-center gap-4">
              <input
                type="text"
                value={pattern}
                onChange={(event) => setPattern(event.target.value)}
                placeholder={openMultiplePagesTexts.patternPlaceholder}
                className="open-multiple-pages-pattern-input rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-500"
              />

              <label className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  {openMultiplePagesTexts.currentPage}
                </span>
                <input
                  type="number"
                  min={1}
                  value={currentPage}
                  onChange={(event) => setCurrentPage(Math.max(Number(event.target.value) || 1, 1))}
                  className="w-28 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-500"
                />
              </label>

              <label className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  {openMultiplePagesTexts.pageCount}
                </span>
                <input
                  type="number"
                  min={1}
                  value={pageCount}
                  onChange={(event) => setPageCount(Math.max(Number(event.target.value) || 1, 1))}
                  className="w-28 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-500"
                />
              </label>

              <label className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  {openMultiplePagesTexts.endPage}
                </span>
                <input
                  type="number"
                  value={endPage}
                  readOnly
                  className="w-28 rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700"
                />
              </label>
            </div>
          </div>

          <div className="flex gap-3 pl-60">
            <button
              type="button"
              onClick={handleList}
              className="open-multiple-pages-button inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 active:bg-blue-700"
            >
              {openMultiplePagesTexts.list}
            </button>
            <button
              type="button"
              onClick={handleOpen}
              className="open-multiple-pages-button inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 active:bg-blue-700"
            >
              {openMultiplePagesTexts.open}
            </button>
          </div>

          <label className="flex items-start gap-4">
            <span className="w-56 pt-2 text-sm font-medium text-gray-700">
              {openMultiplePagesTexts.openPagesList}
            </span>
            <textarea
              value={listedPages}
              onChange={(event) => setListedPages(event.target.value)}
              rows={20}
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-500"
            />
          </label>
        </div>
      </section>
    </main>
  );
}
