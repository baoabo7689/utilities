'use client';

import { useMemo, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const SEARCH_BATCH_SIZE = 10;
const SEARCH_OPEN_DELAY_MS = 200;

export default function MultipleSearchesPage() {
  const { translations } = useLanguage();
  const multipleSearchesTexts = translations.multipleSearches;
  const [rowsText, setRowsText] = useState('');
  const [currentRow, setCurrentRow] = useState(1);
  const [message, setMessage] = useState('');

  const effectiveRows = useMemo(() => {
    const lines = rowsText.split(/\r?\n/);
    const excludeSectionIndex = lines.findIndex((line) =>
      line.trim().toLowerCase().startsWith('exclude:')
    );
    const includedLines =
      excludeSectionIndex === -1 ? lines : lines.slice(0, excludeSectionIndex);

    return includedLines
      .map((line) => line.trim())
      .filter((line) => line.length > 0 && !/^=+$/.test(line));
  }, [rowsText]);

  const endRow = useMemo(() => {
    return Math.min(currentRow + SEARCH_BATCH_SIZE - 1, effectiveRows.length);
  }, [currentRow, effectiveRows.length]);

  const handleSearchNext = () => {
    const batch = effectiveRows.slice(currentRow - 1, currentRow - 1 + SEARCH_BATCH_SIZE);
    if (batch.length === 0) {
      setMessage(multipleSearchesTexts.noRowsLeft);
      return;
    }

    batch.forEach((term, index) => {
      const url = `https://www.google.com/search?q=${encodeURIComponent(term)}`;
      setTimeout(() => {
        window.open(url, '_blank', 'noopener,noreferrer');
      }, index * SEARCH_OPEN_DELAY_MS);
    });

    setCurrentRow((previousRow) => previousRow + batch.length);
    setMessage('');
  };

  return (
    <main className="h-full w-full pl-6 pt-2">
      <section>
        <h1 className="text-3xl font-semibold text-gray-900">
          {translations.topMenus.multipleSearches}
        </h1>

        <div className="mt-4 space-y-4 rounded-lg border border-gray-200 bg-white p-6">
          <label className="flex items-start gap-4">
            <span className="w-56 pt-2 text-sm font-medium text-gray-700">
              {multipleSearchesTexts.searchRows}
            </span>
            <textarea
              value={rowsText}
              onChange={(event) => setRowsText(event.target.value)}
              placeholder={multipleSearchesTexts.rowsPlaceholder}
              rows={20}
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-500"
            />
          </label>

          <div className="flex items-center gap-4">
            <div className="flex flex-1 items-center gap-4">
              <label className="flex items-center gap-2">
                <span className="w-56 text-sm font-medium text-gray-700">
                  {multipleSearchesTexts.currentRow}
                </span>
                <input
                  type="number"
                  min={1}
                  value={currentRow}
                  onChange={(event) =>
                    setCurrentRow(Math.max(Number(event.target.value) || 1, 1))
                  }
                  className="w-28 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-500"
                />
              </label>

              <label className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  {multipleSearchesTexts.totalRows}
                </span>
                <input
                  type="number"
                  value={effectiveRows.length}
                  readOnly
                  className="w-28 rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700"
                />
              </label>

              <label className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  {multipleSearchesTexts.endRow}
                </span>
                <input
                  type="number"
                  value={endRow}
                  readOnly
                  className="w-28 rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700"
                />
              </label>
            </div>
          </div>

          <div className="flex items-center gap-4 pl-60">
            <button
              type="button"
              onClick={handleSearchNext}
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 active:bg-blue-700"
            >
              {multipleSearchesTexts.searchNext}
            </button>
            {message && <span className="text-sm text-gray-600">{message}</span>}
          </div>
        </div>
      </section>
    </main>
  );
}
