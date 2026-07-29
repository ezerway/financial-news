export const languages = {
  vi: 'Tiếng Việt',
  en: 'English',
};

export const defaultLang = 'vi';

export const ui = {
  vi: {
    'nav.dashboard': 'Bảng điều khiển',
    'nav.gold': 'Giá Vàng',
    'nav.oil': 'Giá Xăng Dầu',
    'nav.electric': 'Giá Điện',
    'nav.soccer': 'Tỷ lệ Bóng đá',

    'title.dashboard': 'Bảng điều khiển',
    'title.gold': 'Thống kê Giá Vàng',
    'title.oil': 'Thống kê Giá Xăng Dầu',
    'title.electric': 'Biểu giá & Thông tư Điện lực',
    'title.soccer': 'Tỷ lệ & Kèo Bóng đá',

    'gold.code': 'Mã',
    'gold.name': 'Tên sản phẩm',
    'gold.buy': 'Giá mua vào',
    'gold.sell': 'Giá bán ra',

    'oil.name': 'Tên nhiên liệu',
    'oil.zone1': 'Giá Vùng 1 (VNĐ)',
    'oil.zone2': 'Giá Vùng 2 (VNĐ)',

    'soccer.league': 'Giải đấu',
    'soccer.match': 'Trận đấu',
    'soccer.start': 'Thời gian',
    'soccer.bet100': 'Cược 100',
    'soccer.winwin': 'Thắng/Thắng',
    'soccer.windraw': 'Thắng/Hòa',

    'calendar.noRecords': 'Không có dữ liệu cho ngày đã chọn. Vui lòng chọn ngày được đánh dấu trên lịch!',
    'calendar.recordsFor': 'Dữ liệu ngày',
    'calendar.prevMonth': 'Tháng trước',
    'calendar.nextMonth': 'Tháng sau',

    'user.profile': 'Hồ sơ cá nhân',
    'user.settings': 'Cài đặt',
    'user.signout': 'Đăng xuất',
  },
  en: {
    'nav.dashboard': 'Dashboard',
    'nav.gold': 'Gold Prices',
    'nav.oil': 'Fuel Prices',
    'nav.electric': 'Electricity Tariffs',
    'nav.soccer': 'Soccer Odds',

    'title.dashboard': 'Dashboard',
    'title.gold': 'Gold Price Analytics',
    'title.oil': 'Fuel Price Analytics',
    'title.electric': 'Electricity Tariffs & Notices',
    'title.soccer': 'Soccer Odds & Matches',

    'gold.code': 'Code',
    'gold.name': 'Product Name',
    'gold.buy': 'Buying Price',
    'gold.sell': 'Selling Price',

    'oil.name': 'Fuel Type',
    'oil.zone1': 'Zone 1 Price (VND)',
    'oil.zone2': 'Zone 2 Price (VND)',

    'soccer.league': 'League',
    'soccer.match': 'Match',
    'soccer.start': 'Start Time',
    'soccer.bet100': 'Bet 100',
    'soccer.winwin': 'Win/Win',
    'soccer.windraw': 'Win/Draw',

    'calendar.noRecords': 'No records found for the selected date. Choose a highlighted date in the calendar!',
    'calendar.recordsFor': 'Records for',
    'calendar.prevMonth': 'Previous month',
    'calendar.nextMonth': 'Next month',

    'user.profile': 'Your profile',
    'user.settings': 'Settings',
    'user.signout': 'Sign out',
  },
} as const;

export type UIKey = keyof (typeof ui)['vi'];

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: UIKey) {
    return ui[lang]?.[key] || ui[defaultLang][key] || key;
  };
}

export function getLocalizedPath(pathname: string, targetLang: 'vi' | 'en'): string {
  // Strip leading locale /en if present
  let cleanPath = pathname;
  if (cleanPath.startsWith('/en/')) {
    cleanPath = cleanPath.slice(3);
  } else if (cleanPath === '/en') {
    cleanPath = '/';
  }

  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath;
  }

  if (targetLang === 'en') {
    return cleanPath === '/' ? '/en' : `/en${cleanPath}`;
  }
  
  return cleanPath;
}
