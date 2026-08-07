'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function RemovePrefixSuffixPage() {
  const { translations } = useLanguage();
  const removePrefixSuffixTexts = translations.removePrefixSuffix;
  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');
  const [inputText, setInputText] = useState('');
  const [resultText, setResultText] = useState('');

  const handleProcess = () => {
    const lines = inputText.split(/\r?\n/);
    const processedLines = lines.map((line) => {
      let result = line;
      if (prefix && result.startsWith(prefix)) {
        result = result.slice(prefix.length);
      }
      if (suffix && result.endsWith(suffix)) {
        result = result.slice(0, result.length - suffix.length);
      }
      return result;
    });

    setResultText(processedLines.join('\n'));
  };

  return (
    <main className="h-full w-full pl-6 pt-2">
      <section>
        <h1 className="text-3xl font-semibold text-gray-900">
          {translations.topMenus.removePrefixSuffix}
        </h1>

        <div className="mt-4 space-y-4 rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                {removePrefixSuffixTexts.prefix}
              </span>
              <input
                type="text"
                value={prefix}
                onChange={(event) => setPrefix(event.target.value)}
                placeholder={removePrefixSuffixTexts.prefixPlaceholder}
                className="w-56 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-500"
              />
            </label>

            <label className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                {removePrefixSuffixTexts.suffix}
              </span>
              <input
                type="text"
                value={suffix}
                onChange={(event) => setSuffix(event.target.value)}
                placeholder={removePrefixSuffixTexts.suffixPlaceholder}
                className="w-56 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-500"
              />
            </label>

            <button
              type="button"
              onClick={handleProcess}
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 active:bg-blue-700"
            >
              {removePrefixSuffixTexts.process}
            </button>
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <label className="flex flex-1 flex-col gap-2">
              <span className="text-sm font-medium text-gray-700">
                {removePrefixSuffixTexts.inputText}
              </span>
              <textarea
                value={inputText}
                onChange={(event) => setInputText(event.target.value)}
                rows={20}
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-500"
              />
            </label>

            <label className="flex flex-1 flex-col gap-2">
              <span className="text-sm font-medium text-gray-700">
                {removePrefixSuffixTexts.resultText}
              </span>
              <textarea
                value={resultText}
                onChange={(event) => setResultText(event.target.value)}
                rows={20}
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-500"
              />
            </label>
          </div>
        </div>
      </section>
    </main>
  );
}
