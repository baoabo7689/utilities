'use client';

import { useEffect, useRef, useState } from 'react';

import topMenusConfig from '@/configs/topMenusConfig';
import { useLanguage } from '@/context/LanguageContext';

export default function TopMenus() {
  const { translations } = useLanguage();
  const [openMenuKey, setOpenMenuKey] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onDocumentMouseDown = (event: MouseEvent) => {
      if (!containerRef.current) {
        return;
      }

      if (!containerRef.current.contains(event.target as Node)) {
        setOpenMenuKey(null);
      }
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenMenuKey(null);
      }
    };

    document.addEventListener('mousedown', onDocumentMouseDown);
    document.addEventListener('keydown', onEscape);

    return () => {
      document.removeEventListener('mousedown', onDocumentMouseDown);
      document.removeEventListener('keydown', onEscape);

      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const toggleMenu = (menuKey: string) => {
    setOpenMenuKey((current) => (current === menuKey ? null : menuKey));
  };

  const openMenu = (menuKey: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    setOpenMenuKey(menuKey);
  };

  const closeMenu = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenMenuKey(null);
      closeTimeoutRef.current = null;
    }, 220);
  };

  return (
    <div ref={containerRef} className="flex items-center gap-4">
      {topMenusConfig.map((menu) => {
        const isOpen = openMenuKey === menu.key;
        return (
          <div
            key={menu.key}
            className="relative"
            onMouseEnter={() => openMenu(menu.key)}
            onMouseLeave={closeMenu}
          >
            <button
              type="button"
              className="px-3 py-2 text-sm font-medium text-gray-800 hover:text-blue-600"
              onClick={() => toggleMenu(menu.key)}
            >
              {translations.topMenus?.[menu.menuKey] || menu.menuKey}
            </button>

            <div
              className={`absolute left-0 top-full min-w-52 rounded border border-gray-200 bg-white shadow-md z-20 transition-all duration-200 ease-out ${
                isOpen
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 translate-y-1 pointer-events-none'
              }`}
            >
              <ul className="py-1">
                {menu.subMenus.map((subMenu) => (
                  <li key={subMenu.menuKey}>
                    <a
                      href={subMenu.url}
                      target={subMenu.isExternal ? '_blank' : undefined}
                      rel={subMenu.isExternal ? 'noopener noreferrer' : undefined}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setOpenMenuKey(null)}
                    >
                      {translations.topMenus?.[subMenu.menuKey] || subMenu.menuKey}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
