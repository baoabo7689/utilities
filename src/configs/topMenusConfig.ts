import type { TopMenuModel } from '../models/topMenusModel';

const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const normalizedBasePath = configuredBasePath
  ? `/${configuredBasePath.replace(/^\/+|\/+$/g, '')}`
  : '';
const withBasePath = (path: string) => `${normalizedBasePath}${path}`;

export const topMenusConfig: TopMenuModel[] = [
  {
    key: 'web',
    menuKey: 'web',
    subMenus: [
      {
        menuKey: 'openMultiplePages',
        url: withBasePath('/web/openMultiplePages'),
        isExternal: false,
      },
      {
        menuKey: 'findAllResources',
        url: withBasePath('/web/findAllResources'),
        isExternal: false,
      },
    ],
  },
  {
    key: 'games',
    menuKey: 'games',
    subMenus: [
      {
        menuKey: 'sudoku',
        url: 'https://baoabo7689.github.io/sudoku',
        isExternal: true,
      },
      {
        menuKey: 'rubik',
        url: 'https://baoabo7689.github.io/rubik',
        isExternal: true,
      },
      {
        menuKey: 'werewolf',
        url: 'https://baoabo7689.github.io/werewolf',
        isExternal: true,
      },
    ],
  },
];

export default topMenusConfig;
