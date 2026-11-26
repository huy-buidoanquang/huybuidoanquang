/**
 * Coordinate parsing & equirectangular topographic projection for Vietnam.
 */

export const VIETNAM_BOUNDS = {
    latMin: 8.1,
    latMax: 23.9,
    lonMin: 101.6,
    lonMax: 110.2,
    width: 360,
    height: 620,
    padX: 28,
    padY: 26,
};

/**
 * Parse DMS coordinate strings in either English (N/S/E/W) or Vietnamese (B/N/Đ/T) format,
 * e.g. "23°21′N 105°19′E" or "23°21′B 105°19′Đ".
 * @param {string} raw
 * @returns {{ lat: number; lon: number } | null}
 */
export function parseCoordinates(raw) {
    if (!raw || typeof raw !== 'string') return null;
    const match = raw.match(
        /(\d+(?:\.\d+)?)\s*°\s*(?:(\d+(?:\.\d+)?)\s*[′'])?\s*([NBnbSs])\s+(\d+(?:\.\d+)?)\s*°\s*(?:(\d+(?:\.\d+)?)\s*[′'])?\s*([EĐeđWwTt])/u,
    );
    if (!match) return null;

    const latDeg = Number(match[1]);
    const latMin = match[2] ? Number(match[2]) : 0;
    const latDir = match[3].toUpperCase();
    const lonDeg = Number(match[4]);
    const lonMin = match[5] ? Number(match[5]) : 0;
    const lonDir = match[6].toUpperCase();

    let lat = latDeg + latMin / 60;
    let lon = lonDeg + lonMin / 60;
    if (latDir === 'S') lat = -lat;
    if (lonDir === 'W' || lonDir === 'T') lon = -lon;

    return {
        lat: Number(lat.toFixed(4)),
        lon: Number(lon.toFixed(4)),
    };
}

/**
 * Project a Vietnam lat/lon coordinate into SVG pixel space.
 * @param {number} lat
 * @param {number} lon
 * @returns {{ x: number; y: number }}
 */
export function projectVietnam(lat, lon) {
    const { latMin, latMax, lonMin, lonMax, width, height, padX, padY } = VIETNAM_BOUNDS;
    const innerW = width - padX * 2;
    const innerH = height - padY * 2;
    const x = padX + ((lon - lonMin) / (lonMax - lonMin)) * innerW;
    const y = padY + ((latMax - lat) / (latMax - latMin)) * innerH;
    return {
        x: Number(x.toFixed(1)),
        y: Number(y.toFixed(1)),
    };
}

/**
 * Simplified geographic outline of mainland Vietnam [lat, lon] projected using the
 * exact same coordinate transform so expedition pins sit cleanly on the silhouette.
 * @type {Array<[number, number]>}
 */
const VIETNAM_MAINLAND_COORDS = [
    [23.38, 105.32], // Lung Cu, Ha Giang
    [23.15, 105.92],
    [22.92, 106.68], // Cao Bang NE
    [22.15, 106.75], // Lang Son
    [21.55, 108.02], // Mong Cai
    [21.02, 107.42], // Ha Long
    [20.72, 106.78], // Hai Phong
    [20.22, 106.52], // Nam Dinh
    [19.75, 105.92], // Thanh Hoa
    [18.72, 105.75], // Vinh
    [18.12, 106.38], // Ha Tinh
    [17.48, 106.64], // Dong Hoi
    [16.58, 107.62], // Hue
    [16.12, 108.28], // Da Nang
    [15.42, 108.78], // Quang Nam
    [14.88, 109.02], // Quang Ngai
    [13.82, 109.26], // Quy Nhon / Nhon Hai
    [12.92, 109.42], // Phu Yen
    [12.22, 109.22], // Nha Trang
    [11.58, 109.08], // Phan Rang
    [10.92, 108.15], // Phan Thiet
    [10.35, 107.12], // Vung Tau
    [9.92, 106.62],  // Mekong Coast
    [9.25, 105.82],  // Bac Lieu
    [8.58, 104.76],  // Ca Mau Cape
    [9.42, 104.82],
    [10.02, 105.08], // Rach Gia
    [10.42, 104.46], // Ha Tien
    [10.96, 105.12], // An Giang
    [11.02, 105.98], // Long An
    [11.55, 105.88], // Tay Ninh
    [12.24, 107.48], // Dak Nong
    [13.38, 107.56], // Gia Lai
    [14.72, 107.58], // Kon Tum
    [16.05, 107.25], // A Luoi
    [16.62, 106.58], // Lao Bao
    [17.52, 105.76], // Quang Binh west
    [18.55, 105.12], // Nghe An south
    [19.38, 104.05], // Ky Son
    [20.22, 104.58], // Thanh Hoa west
    [20.85, 103.85], // Son La south
    [21.42, 102.98], // Dien Bien
    [22.41, 102.15], // A Pa Chai
    [22.78, 103.32], // Lai Chau
    [22.58, 104.05], // Lao Cai
    [22.92, 104.65], // Ha Giang west
];

/** @type {Array<[number, number]>} */
const PHU_QUOC_COORDS = [
    [10.42, 103.92],
    [10.35, 104.05],
    [10.02, 104.02],
    [10.12, 103.88],
];

/**
 * Build an SVG polygon path string for a list of [lat, lon] pairs.
 * @param {Array<[number, number]>} coords
 * @returns {string}
 */
function coordsToPath(coords) {
    return coords
        .map(([lat, lon], idx) => {
            const { x, y } = projectVietnam(lat, lon);
            return `${idx === 0 ? 'M' : 'L'}${x},${y}`;
        })
        .join(' ') + ' Z';
}

export const VIETNAM_MAINLAND_PATH = coordsToPath(VIETNAM_MAINLAND_COORDS);
export const PHU_QUOC_PATH = coordsToPath(PHU_QUOC_COORDS);

/**
 * Gently spread pins that share identical or nearly identical projected coordinates
 * (e.g. Ta Xua 2023, Ta Xua 2025, Phu Sa Phin) so every marker remains cleanly clickable.
 * @template {{ x: number; y: number }} T
 * @param {T[]} pins
 * @param {number} [minDist=17]
 * @returns {Array<T & { px: number; py: number }>}
 */
export function resolvePinCollisions(pins, minDist = 17) {
    const placed = pins.map((pin) => ({ ...pin, px: pin.x, py: pin.y }));
    const angles = [0, 2.2, 4.3, 1.1, 3.3, 5.4];

    for (let i = 0; i < placed.length; i++) {
        let attempts = 0;
        while (attempts < 12) {
            let collided = false;
            for (let j = 0; j < i; j++) {
                const dx = placed[i].px - placed[j].px;
                const dy = placed[i].py - placed[j].py;
                if (Math.hypot(dx, dy) < minDist) {
                    collided = true;
                    break;
                }
            }
            if (!collided) break;
            const angle = angles[attempts % angles.length] + i * 0.45;
            const ring = minDist * (1 + Math.floor(attempts / angles.length) * 0.65);
            placed[i].px = Number((placed[i].x + Math.cos(angle) * ring).toFixed(1));
            placed[i].py = Number((placed[i].y + Math.sin(angle) * ring).toFixed(1));
            attempts += 1;
        }
    }
    return placed;
}
