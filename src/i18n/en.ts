export const translations = {
  header: {
    title: 'Utilities',
    language: 'Language',
    toggleLanguage: 'Change language',
    help: 'Help',
    contact: 'Contact',
  },
  help: {
    title: 'Help',
    web: 'Web',
    games: 'Games',
    webHelps: [
      'Open multiple pages: one click to open multiple web pages',
      'Find all resources: list all resources on a web page',
    ],
  },
  home: {
    title: 'Welcome',
    description:
      'This utility workspace helps you access common tools and information from one place. Use the top menu to navigate quickly and switch language when needed.',
    body: [
      'Start with the menu links in the header to explore available sections and actions.',
      'If you need help, open the help page from the top-right button for quick guidance.',
    ],
  },
  topMenus: {
    web: 'Web',
    games: 'Games',
    openMultiplePages: 'Open multiple pages',
    findAllResources: 'Find all resources',
    sudoku: 'Sudoku',
    rubik: 'Rubik',
    werewolf: 'Werewolf',
  },
  openMultiplePages: {
    webPagePattern: 'Web page pattern',
    patternPlaceholder: 'https://example.com/page/{page}',
    pageValues: 'Page values',
    currentPage: 'Current page',
    pageCount: 'Page count',
    endPage: 'End page',
    openPagesList: 'Open pages list (current to end)',
    list: 'List',
    open: 'Open',
  },
  findAllResources: {
    webUrl: 'Web URL',
    urlPlaceholder: 'https://example.com',
    resourcesList: 'Resources list',
    list: 'List',
    loading: 'Loading resources...',
    invalidUrl: 'Please enter a valid URL.',
    fetchError: 'Cannot fetch resources from this URL. The site may block cross-origin requests.',
    empty: 'No resources found.',
  },
};

export default { translations };
