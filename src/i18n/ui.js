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
        footerTagline: 'The story is still unfolding.',
        footerMail: "Let's talk ↗",
        footerTop: 'Back to top ↑',
        homeTitle: 'Portfolio × Journal',
        compassAria: 'Chapter quick navigation',
        compassChapters: [
            'Chapter 01: Departure',
            'Chapter 02: About',
            'Chapter 03: Projects',
            'Chapter 04: Journeys',
            'Chapter 05: Journal',
        ],
        heroToplineLeft: '01 / Departure',
        heroToplineSuffix: '→ anywhere',
        heroKickerLine1: 'Portfolio / Field notes',
        heroKickerLine2: 'One person, many journeys',
        heroScrollAria: 'Scroll to projects',
        heroHintLine1: 'Scroll to move through the chapters',
        heroHintLine2: 'Click any stop to explore',
        aboutNumber: '02 / About',
        aboutHeading1: 'Two worlds.',
        aboutHeading2: 'One storyteller.',
        aboutBody: 'Between lines of code and unfamiliar roads — I build .NET backends, realtime SDKs, and interactive web experiences, while keeping the raw trail notes behind every journey.',
        aboutCraftLabel: 'Engineering Focus',
        aboutCraftValue: '.NET / C# · Realtime SDKs · TypeScript · 3D Canvas',
        aboutBaseLabel: 'Base & Trailhead',
        aboutBaseValue: 'Vietnam · {count} Expeditions Logged',
        aboutLinksLabel: 'Find me online',
        projectsNumber: '03 / Selected work',
        projectsHeading1: 'Made',
        projectsHeading2: 'of curiosity.',
        journeysNumber: '04 / Beyond the screen',
        journeysHeading1: 'Beyond',
        journeysHeading2: 'coordinates.',
        journeysBody: '{count} real expeditions across Vietnam — from dawn granite reefs to starlit cloud seas at 2,868 meters and March karst passes in Ha Giang. Each place carries its own atmosphere and photo archive.',
        mapTitle: 'Expedition Map · Vietnam',
        mapSubtitle: 'Select any glowing coordinate pin to preview or jump straight into the story',
        mapExploreHint: 'Click pin to open expedition ↗',
        stepInside: 'Step inside ↗',
        journalNumber: '05 / Journal',
        journalHeading1: 'Field',
        journalHeading2: 'notes.',
        browseAll: 'Browse all stories & journeys ↗',
        archiveTitle: 'Journal',
        archiveKicker: 'Journal / Complete Archive',
        archiveHeading1: 'Stories',
        archiveHeading2: 'to tell.',
        archiveIntro: "Every journey, milestone, and technical note — collected chronologically with its own atmosphere and photo archive.",
        filterAria: 'Filter stories by topic',
        filterAll: 'All',
        filterJourneys: 'Journeys',
        filterMilestones: 'Milestones',
        filterEngineering: 'Engineering',
        journeyLabel: 'Journey',
        projectLabel: 'Project',
        journeyTag: 'journey',
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
                endText: 'End of the story, not the journey.',
                endLabel: 'Read more stories ↗',
            },
            projects: {
                backLabel: '← Back to projects',
                endText: 'One project shipped, another question waiting.',
                endLabel: 'Explore more projects ↗',
            },
            destinations: {
                backLabel: '← Back to journeys',
                endText: 'Every place leaves its own light behind.',
                endLabel: 'Explore more places ↗',
            },
        },
        telemetryAria: 'Expedition details',
        telemetryRegion: 'Region',
        telemetryCoords: 'Coordinates',
        telemetryElevation: 'Elevation',
        telemetryDates: 'Dates',
        galleryAria: 'Photo gallery',
        galleryHeading: 'Gallery',
        galleryFrames: 'frames',
        photoSource: 'Photo source',
        enlargePhoto: 'Enlarge photo',
        inspectFeaturedPhoto: 'Inspect featured photo in fullscreen',
        projectStack: 'Stack',
        projectRole: 'Focus',
        projectYear: 'Year',
        projectLinks: 'Links',
        repoLabel: 'GitHub Repository ↗',
        liveDemoLabel: 'Live Site ↗',
        prevStoryLabel: '← Previous',
        nextStoryLabel: 'Next →',
        copyLink: 'Copy link',
        linkCopied: 'Link copied ✓',
        readingProgressAria: 'Reading progress',
        lightboxAria: 'Immersive photo viewer',
        lightboxZoom: 'Zoom 1×',
        lightboxZoomAria: 'Toggle zoom',
        lightboxPrevAria: 'Previous photo',
        lightboxNextAria: 'Next photo',
        lightboxClose: 'Close ×',
        lightboxCloseAria: 'Close photo',
        lightboxJumpAria: 'Jump to photo',
        deckHint: 'Click side cards or drag to fan · Click center to zoom',
        stripFrames: 'frames',
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
        footerTagline: 'Một câu chuyện vẫn đang tiếp tục.',
        footerMail: 'Trò chuyện nhé ↗',
        footerTop: 'Về đầu trang ↑',
        homeTitle: 'Portfolio × Nhật ký',
        compassAria: 'Điều hướng nhanh theo chương',
        compassChapters: [
            'Chương 01: Khởi hành',
            'Chương 02: Về tôi',
            'Chương 03: Dự án',
            'Chương 04: Chuyến đi',
            'Chương 05: Nhật ký',
        ],
        heroToplineLeft: '01 / Điểm xuất phát',
        heroToplineSuffix: '→ bất cứ đâu',
        heroKickerLine1: 'Portfolio / Nhật ký hành trình',
        heroKickerLine2: 'Một người, nhiều chuyến đi',
        heroScrollAria: 'Cuộn tới mục dự án',
        heroHintLine1: 'Cuộn để đi xuyên qua các chương',
        heroHintLine2: 'Nhấn vào từng điểm dừng để khám phá',
        aboutNumber: '02 / Về tôi',
        aboutHeading1: 'Hai thế giới.',
        aboutHeading2: 'Một người kể.',
        aboutBody: 'Giữa những dòng code và những cung đường xa lạ — tôi phát triển hệ thống .NET, realtime SDK và web tương tác, đồng thời giữ lại trọn vẹn từng chặng đường mình đã đi qua.',
        aboutCraftLabel: 'Chuyên môn kỹ thuật',
        aboutCraftValue: '.NET / C# · Realtime SDK · TypeScript · 3D Canvas',
        aboutBaseLabel: 'Xuất phát điểm',
        aboutBaseValue: 'Việt Nam · {count} hành trình đã ghi lại',
        aboutLinksLabel: 'Kết nối trực tiếp',
        projectsNumber: '03 / Dự án chọn lọc',
        projectsHeading1: 'Tạo ra từ',
        projectsHeading2: 'sự tò mò.',
        journeysNumber: '04 / Ngoài màn hình',
        journeysHeading1: 'Vượt ngoài',
        journeysHeading2: 'tọa độ.',
        journeysBody: '{count} hành trình có thật khắp Việt Nam — từ bình minh gành đá granite, biển mây đầy sao ở độ cao 2.868m đến những khúc đèo đá tai mèo Hà Giang. Mỗi vùng đất mang một khí quyển và bộ ảnh riêng.',
        mapTitle: 'Bản đồ hành trình · Việt Nam',
        mapSubtitle: 'Chạm hoặc rê chuột vào từng tọa độ phát sáng để xem nhanh và mở bài viết',
        mapExploreHint: 'Nhấn vào điểm tọa độ để bước vào hành trình ↗',
        stepInside: 'Bước vào hành trình ↗',
        journalNumber: '05 / Nhật ký',
        journalHeading1: 'Ghi chép',
        journalHeading2: 'dọc đường.',
        browseAll: 'Xem tất cả câu chuyện & chuyến đi ↗',
        archiveTitle: 'Nhật ký',
        archiveKicker: 'Nhật ký / Toàn bộ lưu trữ',
        archiveHeading1: 'Những câu chuyện',
        archiveHeading2: 'để kể lại.',
        archiveIntro: 'Mỗi chuyến đi, cột mốc đáng nhớ và ghi chép kỹ thuật — được lưu lại theo dòng thời gian với phong cách và bộ ảnh riêng.',
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
                backLabel: '← Trở lại nhật ký',
                endText: 'Khép lại một câu chuyện, hành trình vẫn tiếp tục.',
                endLabel: 'Đọc những bài khác ↗',
            },
            projects: {
                backLabel: '← Trở lại dự án',
                endText: 'Một dự án hoàn thành, một câu hỏi mới mở ra.',
                endLabel: 'Xem các dự án khác ↗',
            },
            destinations: {
                backLabel: '← Trở lại chuyến đi',
                endText: 'Mỗi vùng đất đi qua đều để lại một thứ ánh sáng riêng.',
                endLabel: 'Khám phá những điểm đến khác ↗',
            },
        },
        telemetryAria: 'Thông tin chuyến đi',
        telemetryRegion: 'Vùng đất',
        telemetryCoords: 'Tọa độ',
        telemetryElevation: 'Độ cao',
        telemetryDates: 'Thời gian',
        galleryAria: 'Bộ ảnh',
        galleryHeading: 'Bộ ảnh',
        galleryFrames: 'khung hình',
        photoSource: 'Nguồn ảnh',
        enlargePhoto: 'Phóng lớn ảnh',
        inspectFeaturedPhoto: 'Xem toàn màn hình khung hình nổi bật',
        projectStack: 'Công nghệ',
        projectRole: 'Trọng tâm',
        projectYear: 'Thời gian',
        projectLinks: 'Liên kết',
        repoLabel: 'Mã nguồn GitHub ↗',
        liveDemoLabel: 'Trang trực tuyến ↗',
        prevStoryLabel: '← Bài trước',
        nextStoryLabel: 'Bài tiếp theo →',
        copyLink: 'Sao chép liên kết',
        linkCopied: 'Đã sao chép ✓',
        readingProgressAria: 'Tiến độ đọc bài',
        lightboxAria: 'Trình xem ảnh toàn màn hình',
        lightboxZoom: 'Phóng 1×',
        lightboxZoomAria: 'Bật hoặc tắt thu phóng',
        lightboxPrevAria: 'Ảnh trước',
        lightboxNextAria: 'Ảnh tiếp theo',
        lightboxClose: 'Đóng ×',
        lightboxCloseAria: 'Đóng trình xem ảnh',
        lightboxJumpAria: 'Chuyển tới ảnh',
        deckHint: 'Bấm thẻ hai bên hoặc kéo để lật · Bấm ảnh giữa để phóng lớn',
        stripFrames: 'khung hình',
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
