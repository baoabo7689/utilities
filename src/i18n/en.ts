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
    text: 'Text',
    games: 'Games',
    webHelps: [
      'Open multiple pages: one click to open multiple web pages',
      'Find all resources: list all resources on a web page',
      'Multiple searches: search Google for a batch of rows, 10 at a time',
    ],
    textHelps: [
      'Remove prefix/suffix: strip a given prefix and/or suffix from each line of text',
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
    multipleSearches: 'Multiple searches',
    text: 'Text',
    removePrefixSuffix: 'Remove prefix/suffix',
    sudoku: 'Sudoku',
    rubik: 'Rubik',
    werewolf: 'Werewolf',
    nonogram: 'Nonogram',
    ying_yang: 'Ying Yang',
    shikaku: 'Shikaku',
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
  removePrefixSuffix: {
    prefix: 'Prefix',
    suffix: 'Suffix',
    prefixPlaceholder: 'e.g. IMG_',
    suffixPlaceholder: 'e.g. .jpg',
    inputText: 'Input text',
    resultText: 'Result text',
    process: 'Process',
  },
  multipleSearches: {
    searchRows: 'Search rows',
    rowsPlaceholder:
      'One search term per line...\n===============\nLines of ===== are ignored\n\nExclude:\nRows below a line starting with "Exclude:" are ignored',
    currentRow: 'Current row',
    totalRows: 'Total rows',
    endRow: 'End row',
    searchNext: 'Search next 10',
    noRowsLeft: 'No more rows to search.',
  },
};

export default { translations };
