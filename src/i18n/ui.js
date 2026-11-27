/** @typedef {'en' | 'vi'} Lang */

export const ui = {
    en: {
        skipLink: 'Skip to content',
        backHomeAria: 'Back to home',
        navAria: 'Primary navigation',
        navProjects: 'Projects',
        navJourneys: 'Journeys',
        navJournal: 'Journal',
        headerBadge: 'Portfolio / Journal — 2026',
        langSwitchAria: 'Switch language',
        footerTagline: 'More code to ship and roads to ride.',
        footerMail: 'Say hello ↗',
        footerTop: 'Back to top ↑',
        homeTitle: 'Portfolio × Journal',
        compassAria: 'Chapter quick navigation',
        compassChapters: [
            'Chapter 01: Start',
            'Chapter 02: About',
            'Chapter 03: Projects',
            'Chapter 04: Journeys',
            'Chapter 05: Journal',
        ],
        heroToplineLeft: '01 / Start',
        heroToplineSuffix: '→ anywhere',
        heroKickerLine1: 'Software & travel notes',
        heroKickerLine2: 'Code, frames, and open roads',
        heroScrollAria: 'Scroll to projects',
        heroHintLine1: 'Scroll through the chapters',
        heroHintLine2: 'Click any stop to open',
        aboutNumber: '02 / About',
        aboutHeading1: 'Build things.',
        aboutHeading2: 'Hit the road.',
        aboutBody: "Most days I work on .NET systems, realtime SDKs, and interactive web builds. On days off, I pack a bag, head for the mountains or the coast, and write things down before the details fade.",
        aboutCraftLabel: 'What I build',
        aboutCraftValue: '.NET / C# · Realtime SDKs · TypeScript · 3D Canvas',
        aboutBaseLabel: 'Based in',
        aboutBaseValue: 'Vietnam · {count} trips logged',
        aboutLinksLabel: 'Elsewhere',
        projectsNumber: '03 / Selected work',
        projectsHeading1: "Things I've",
        projectsHeading2: 'built.',
        journeysNumber: '04 / On the road',
        journeysHeading1: "Places I've",
        journeysHeading2: 'been.',
        journeysBody: '{count} trips around Vietnam — from dawn granite reefs in Nhon Hai to starlit clouds at 2,868m and foggy March passes in Ha Giang. Each page holds the photos and mood of that trip.',
        mapTitle: 'Trip Map · Vietnam',
        mapSubtitle: 'Pick any pin or tab to preview a stop and jump straight into the story',
        mapExploreHint: 'Click a pin to open the trip ↗',
        stepInside: 'Open story ↗',
        journalNumber: '05 / Journal',
        journalHeading1: 'Notes',
        journalHeading2: 'along the way.',
        browseAll: 'Browse all stories & trips ↗',
        archiveTitle: 'Journal',
        archiveKicker: 'Journal / Archive',
        archiveHeading1: 'Stories',
        archiveHeading2: 'worth keeping.',
        archiveIntro: 'Every trip, personal milestone, and engineering note — sorted chronologically in one place.',
        filterAria: 'Filter stories by topic',
        filterAll: 'All',
        filterJourneys: 'Trips',
        filterMilestones: 'Milestones',
        filterEngineering: 'Engineering',
        journeyLabel: 'Trip',
        projectLabel: 'Project',
        journeyTag: 'trip',
        categories: {
            milestone: 'milestone',
            travel: 'travel',
            engineering: 'engineering',
            photography: 'photography',
            notes: 'notes',
        },
        storyNav: {
            posts: {
                backLabel: '← Back to journal',
                endText: 'More notes in the archive.',
                endLabel: 'Read other posts ↗',
            },
            projects: {
                backLabel: '← Back to projects',
                endText: 'More builds on the shelf.',
                endLabel: 'See other projects ↗',
            },
            destinations: {
                backLabel: '← Back to journeys',
                endText: 'Ready for the next stop?',
                endLabel: 'Browse all trips ↗',
            },
        },
        telemetryAria: 'Trip details',
        telemetryRegion: 'Region',
        telemetryCoords: 'Coordinates',
        telemetryElevation: 'Elevation',
        telemetryDates: 'Dates',
        galleryAria: 'Photo gallery',
        galleryHeading: 'Gallery',
        galleryFrames: 'photos',
        photoSource: 'Photo source',
        enlargePhoto: 'Enlarge photo',
        inspectFeaturedPhoto: 'Open featured photo fullscreen',
        projectStack: 'Stack',
        projectRole: 'Focus',
        projectYear: 'Year',
        projectLinks: 'Links',
        repoLabel: 'GitHub Repo ↗',
        liveDemoLabel: 'Live Site ↗',
        prevStoryLabel: '← Previous',
        nextStoryLabel: 'Next →',
        copyLink: 'Copy link',
        linkCopied: 'Copied ✓',
        readingProgressAria: 'Reading progress',
        lightboxAria: 'Fullscreen photo viewer',
        lightboxZoom: 'Zoom 1×',
        lightboxZoomAria: 'Toggle zoom',
        lightboxPrevAria: 'Previous photo',
        lightboxNextAria: 'Next photo',
        lightboxClose: 'Close ×',
        lightboxCloseAria: 'Close photo',
        lightboxJumpAria: 'Jump to photo',
        deckHint: 'Click side cards or drag to flip · Click center to enlarge',
        stripFrames: 'photos',
    },
    vi: {
        skipLink: 'Bỏ qua điều hướng',
        backHomeAria: 'Về trang chủ',
        navAria: 'Điều hướng chính',
        navProjects: 'Dự án',
        navJourneys: 'Chuyến đi',
        navJournal: 'Nhật ký',
        headerBadge: 'Portfolio / Nhật ký — 2026',
        langSwitchAria: 'Chuyển đổi ngôn ngữ',
        footerTagline: 'Còn nhiều dự án để làm và nhiều cung đường phía trước.',
        footerMail: 'Trò chuyện nhé ↗',
        footerTop: 'Lên đầu trang ↑',
        homeTitle: 'Portfolio × Nhật ký',
        compassAria: 'Điều hướng nhanh theo mục',
        compassChapters: [
            'Mục 01: Khởi hành',
            'Mục 02: Về tôi',
            'Mục 03: Dự án',
            'Mục 04: Chuyến đi',
            'Mục 05: Nhật ký',
        ],
        heroToplineLeft: '01 / Khởi hành',
        heroToplineSuffix: '→ đi đâu đó',
        heroKickerLine1: 'Phần mềm & nhật ký',
        heroKickerLine2: 'Code, ảnh và những cung đường',
        heroScrollAria: 'Cuộn xuống phần dự án',
        heroHintLine1: 'Cuộn xuống để xem từng phần',
        heroHintLine2: 'Bấm vào từng điểm để mở bài',
        aboutNumber: '02 / Về tôi',
        aboutHeading1: 'Viết code.',
        aboutHeading2: 'Và đi xa.',
        aboutBody: 'Hằng ngày tôi làm hệ thống .NET, realtime SDK và vài thứ thú vị trên web. Những ngày rảnh, tôi xách balo đi đâu đó rồi viết lại vài dòng để khỏi quên.',
        aboutCraftLabel: 'Công việc chính',
        aboutCraftValue: '.NET / C# · Realtime SDK · TypeScript · 3D Canvas',
        aboutBaseLabel: 'Hiện tại',
        aboutBaseValue: 'Việt Nam · {count} chuyến đi đã ghi lại',
        aboutLinksLabel: 'Kết nối',
        projectsNumber: '03 / Dự án chọn lọc',
        projectsHeading1: 'Những thứ',
        projectsHeading2: 'tự tay làm.',
        journeysNumber: '04 / Chuyến đi',
        journeysHeading1: 'Những nơi',
        journeysHeading2: 'đã đi qua.',
        journeysBody: '{count} chuyến đi dọc Việt Nam — từ bình minh gành đá Nhơn Hải, đêm đầy sao trên đỉnh 2.868m đến những khúc đèo sương mù Hà Giang. Mỗi nơi đều được lưu lại bằng bộ ảnh và đúng cảm giác lúc đó.',
        mapTitle: 'Bản đồ chuyến đi · Việt Nam',
        mapSubtitle: 'Chọn một điểm trên bản đồ hoặc bấm tên địa điểm để xem nhanh và mở bài',
        mapExploreHint: 'Bấm vào chấm tọa độ để mở bài viết ↗',
        stepInside: 'Xem chuyến đi ↗',
        journalNumber: '05 / Nhật ký',
        journalHeading1: 'Viết lại',
        journalHeading2: 'để nhớ.',
        browseAll: 'Xem toàn bộ bài viết & chuyến đi ↗',
        archiveTitle: 'Nhật ký',
        archiveKicker: 'Nhật ký / Lưu trữ',
        archiveHeading1: 'Những câu chuyện',
        archiveHeading2: 'để nhớ lại.',
        archiveIntro: 'Tất cả các chuyến đi, cột mốc đáng nhớ và vài ghi chép kỹ thuật — xếp theo dòng thời gian để thi thoảng mở ra xem lại.',
        filterAria: 'Lọc bài viết theo chủ đề',
        filterAll: 'Tất cả',
        filterJourneys: 'Chuyến đi',
        filterMilestones: 'Cột mốc',
        filterEngineering: 'Kỹ thuật',
        journeyLabel: 'Chuyến đi',
        projectLabel: 'Dự án',
        journeyTag: 'chuyến đi',
        categories: {
            milestone: 'cột mốc',
            travel: 'du lịch',
            engineering: 'kỹ thuật',
            photography: 'nhiếp ảnh',
            notes: 'ghi chép',
        },
        storyNav: {
            posts: {
                backLabel: '← Về trang nhật ký',
                endText: 'Vẫn còn vài ghi chép khác trong lưu trữ.',
                endLabel: 'Đọc các bài khác ↗',
            },
            projects: {
                backLabel: '← Về mục dự án',
                endText: 'Xem thêm những dự án khác mình từng làm.',
                endLabel: 'Xem các dự án khác ↗',
            },
            destinations: {
                backLabel: '← Về danh sách chuyến đi',
                endText: 'Đi tiếp sang một vùng đất khác nhé.',
                endLabel: 'Xem tất cả chuyến đi ↗',
            },
        },
        telemetryAria: 'Thông tin chuyến đi',
        telemetryRegion: 'Vùng đất',
        telemetryCoords: 'Tọa độ',
        telemetryElevation: 'Độ cao',
        telemetryDates: 'Thời gian',
        galleryAria: 'Bộ ảnh',
        galleryHeading: 'Bộ ảnh',
        galleryFrames: 'tấm ảnh',
        photoSource: 'Nguồn ảnh',
        enlargePhoto: 'Xem ảnh lớn',
        inspectFeaturedPhoto: 'Mở ảnh nổi bật toàn màn hình',
        projectStack: 'Công nghệ',
        projectRole: 'Trọng tâm',
        projectYear: 'Thời gian',
        projectLinks: 'Liên kết',
        repoLabel: 'Xem trên GitHub ↗',
        liveDemoLabel: 'Mở trang web ↗',
        prevStoryLabel: '← Bài trước',
        nextStoryLabel: 'Bài tiếp theo →',
        copyLink: 'Sao chép link',
        linkCopied: 'Đã sao chép ✓',
        readingProgressAria: 'Tiến độ đọc bài',
        lightboxAria: 'Trình xem ảnh toàn màn hình',
        lightboxZoom: 'Zoom 1×',
        lightboxZoomAria: 'Bật hoặc tắt zoom',
        lightboxPrevAria: 'Ảnh trước',
        lightboxNextAria: 'Ảnh tiếp theo',
        lightboxClose: 'Đóng ×',
        lightboxCloseAria: 'Đóng trình xem ảnh',
        lightboxJumpAria: 'Chuyển tới ảnh',
        deckHint: 'Bấm ảnh hai bên hoặc kéo để lật · Bấm ảnh giữa để xem lớn',
        stripFrames: 'ảnh',
    },
};

/** @param {string} pathname @returns {Lang} */
export function getLangFromPath(pathname) {
    return pathname === '/vi' || pathname.startsWith('/vi/') ? 'vi' : 'en';
}

/** @param {string} pathname @returns {string} */
export function stripViPrefix(pathname) {
    if (pathname === '/vi' || pathname === '/vi/') return '/';
    if (pathname.startsWith('/vi/')) return pathname.slice(3);
    return pathname.startsWith('/') ? pathname : `/${pathname}`;
}

/** @param {string} path @param {Lang} lang @returns {string} */
export function localizePath(path, lang) {
    const clean = stripViPrefix(path);
    if (lang === 'en') return clean;
    if (clean === '/') return '/vi/';
    if (clean.startsWith('/#')) return `/vi${clean}`;
    return `/vi${clean}`;
}

/** @param {string} id @returns {boolean} */
export function isViId(id) {
    return id.startsWith('vi/');
}

/** @param {string} id @returns {string} */
export function stripEntryLang(id) {
    return isViId(id) ? id.slice(3) : id;
}

/**
 * Determine preferred language from stored user choice or browser language list.
 * @param {string | null | undefined} savedLang
 * @param {readonly string[] | null | undefined} browserLanguages
 * @returns {Lang}
 */
export function detectPreferredLang(savedLang, browserLanguages) {
    if (savedLang === 'vi' || savedLang === 'en') return savedLang;
    const list = browserLanguages || [];
    for (const raw of list) {
        const norm = String(raw || '').toLowerCase();
        if (norm === 'vi' || norm.startsWith('vi-')) return 'vi';
        if (norm === 'en' || norm.startsWith('en-')) return 'en';
    }
    return 'en';
}
