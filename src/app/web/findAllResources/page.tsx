'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function FindAllResourcesPage() {
  const { translations } = useLanguage();
  const findAllResourcesTexts = translations.findAllResources;
  const [webUrl, setWebUrl] = useState('');
  const [resources, setResources] = useState('');

  const normalizeResourceUrl = (rawValue: string, baseUrl: string) => {
    const value = rawValue.trim();
    if (
      !value ||
      value.startsWith('data:') ||
      value.startsWith('javascript:') ||
      value.startsWith('#')
    ) {
      return '';
    }

    try {
      return new URL(value, baseUrl).toString();
    } catch {
      return '';
    }
  };

  const extractCssUrls = (cssText: string, baseUrl: string) => {
    const urls = new Set<string>();
    const regex = /url\(([^)]+)\)/gi;
    let match = regex.exec(cssText);

    while (match) {
      const raw = match[1].trim().replace(/^['"]|['"]$/g, '');
      const normalized = normalizeResourceUrl(raw, baseUrl);
      if (normalized) {
        urls.add(normalized);
      }
      match = regex.exec(cssText);
    }

    return urls;
  };

  const handleListResources = async () => {
    const trimmedUrl = webUrl.trim();
    if (!trimmedUrl) {
      setResources(findAllResourcesTexts.invalidUrl);
      return;
    }

    let targetUrl = trimmedUrl;
    try {
      targetUrl = new URL(trimmedUrl).toString();
    } catch {
      setResources(findAllResourcesTexts.invalidUrl);
      return;
    }

    setResources(findAllResourcesTexts.loading);

    try {
      const response = await fetch(targetUrl);
      if (!response.ok) {
        throw new Error('Fetch failed');
      }

      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const resourcesSet = new Set<string>();
      const selectors = [
        'link[href]',
        'script[src]',
        'img[src]',
        'img[srcset]',
        'source[src]',
        'source[srcset]',
        'video[src]',
        'audio[src]',
        'iframe[src]',
        '[style]',
      ];

      doc.querySelectorAll(selectors.join(',')).forEach((element) => {
        ['href', 'src'].forEach((attribute) => {
          const value = element.getAttribute(attribute);
          if (!value) {
            return;
          }

          const normalized = normalizeResourceUrl(value, targetUrl);
          if (normalized) {
            resourcesSet.add(normalized);
          }
        });

        ['srcset'].forEach((attribute) => {
          const value = element.getAttribute(attribute);
          if (!value) {
            return;
          }

          value.split(',').forEach((srcEntry) => {
            const resourceCandidate = srcEntry.trim().split(' ')[0];
            const normalized = normalizeResourceUrl(resourceCandidate, targetUrl);
            if (normalized) {
              resourcesSet.add(normalized);
            }
          });
        });

        const inlineStyle = element.getAttribute('style');
        if (inlineStyle) {
          extractCssUrls(inlineStyle, targetUrl).forEach((item) => resourcesSet.add(item));
        }
      });

      doc.querySelectorAll('style').forEach((styleElement) => {
        extractCssUrls(styleElement.textContent || '', targetUrl).forEach((item) =>
          resourcesSet.add(item)
        );
      });

      const resourcesList = Array.from(resourcesSet).sort();
      setResources(
        resourcesList.length > 0 ? resourcesList.join('\n') : findAllResourcesTexts.empty
      );
    } catch {
      setResources(findAllResourcesTexts.fetchError);
    }
  };

  return (
    <main className="h-full w-full pl-6 pt-2">
      <section>
        <h1 className="text-3xl font-semibold text-gray-900">
          {translations.topMenus.findAllResources}
        </h1>

        <div className="mt-4 space-y-4 rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-4">
            <span className="w-56 text-sm font-medium text-gray-700">
              {findAllResourcesTexts.webUrl}
            </span>

            <input
              type="text"
              value={webUrl}
              onChange={(event) => setWebUrl(event.target.value)}
              placeholder={findAllResourcesTexts.urlPlaceholder}
              className="open-multiple-pages-pattern-input flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-500"
            />
          </div>

          <div className="pl-60">
            <button
              type="button"
              onClick={handleListResources}
              className="open-multiple-pages-button inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 active:bg-blue-700"
            >
              {findAllResourcesTexts.list}
            </button>
          </div>

          <label className="flex items-start gap-4">
            <span className="w-56 pt-2 text-sm font-medium text-gray-700">
              {findAllResourcesTexts.resourcesList}
            </span>
            <textarea
              value={resources}
              onChange={(event) => setResources(event.target.value)}
              rows={20}
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-500"
            />
          </label>
        </div>
      </section>
    </main>
  );
}
