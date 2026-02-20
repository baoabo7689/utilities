'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
  const { translations } = useLanguage();

  return (
    <main className="h-full w-full">
      <section className="h-full w-full flex-col border border-gray-200 p-8 shadow-sm">
        <h2 className="text-3xl font-semibold text-gray-900">{translations.home.title}</h2>
        <p className="mt-3 text-base leading-7 text-gray-700">{translations.home.description}</p>

        <div className="mt-6 space-y-3 text-gray-700">
          <p>{translations.home.body[0]}</p>
          <p>{translations.home.body[1]}</p>
        </div>
      </section>
    </main>
  );
}
