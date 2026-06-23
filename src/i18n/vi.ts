export const translations = {
  header: {
    title: 'Tiện ích',
    language: 'Ngôn ngữ',
    toggleLanguage: 'Đổi ngôn ngữ',
    help: 'Trợ giúp',
    contact: 'Liên hệ',
  },
  help: {
    title: 'Trợ giúp',
    web: 'Web',
    games: 'Trò chơi',
    webHelps: [
      'Mở nhiều trang: một cú nhấp để mở nhiều trang web',
      'Tìm tất cả tài nguyên: liệt kê tất cả tài nguyên trên một trang web',
    ],
  },
  home: {
    title: 'Chào mừng',
    description:
      'Không gian tiện ích này giúp bạn truy cập nhanh các công cụ và thông tin ở một nơi. Hãy dùng menu trên cùng để điều hướng và chuyển ngôn ngữ khi cần.',
    body: [
      'Bắt đầu với các liên kết menu ở phần đầu trang để khám phá những mục và thao tác có sẵn.',
      'Nếu cần trợ giúp, hãy mở trang trợ giúp bằng nút ở góc trên bên phải để xem hướng dẫn nhanh.',
    ],
  },
  topMenus: {
    web: 'Web',
    games: 'Trò chơi',
    openMultiplePages: 'Mở nhiều trang',
    findAllResources: 'Tìm tất cả tài nguyên',
    sudoku: 'Sudoku',
    rubik: 'Rubik',
    werewolf: 'Ma sói',
    ying_yang: 'Ying Yang',
    shikaku: 'Shikaku',
  },
  openMultiplePages: {
    webPagePattern: 'Mẫu trang web',
    patternPlaceholder: 'https://example.com/page/{page}',
    pageValues: 'Giá trị trang',
    currentPage: 'Trang hiện tại',
    pageCount: 'Số trang',
    endPage: 'Trang cuối',
    openPagesList: 'Danh sách trang mở (từ hiện tại đến cuối)',
    list: 'Liệt kê',
    open: 'Mở',
  },
  findAllResources: {
    webUrl: 'URL trang web',
    urlPlaceholder: 'https://example.com',
    resourcesList: 'Danh sách tài nguyên',
    list: 'Liệt kê',
    loading: 'Đang tải tài nguyên...',
    invalidUrl: 'Vui lòng nhập URL hợp lệ.',
    fetchError: 'Không thể tải tài nguyên từ URL này. Trang có thể chặn yêu cầu khác nguồn.',
    empty: 'Không tìm thấy tài nguyên nào.',
  },
};

export default { translations };
