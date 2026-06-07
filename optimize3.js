const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Inject the SVG filter right after <body>
const svgFilter = `
    <!-- SVG Filter to cut black backgrounds -->
    <svg width="0" height="0" style="position: absolute; pointer-events: none;">
        <filter id="unblack" color-interpolation-filters="sRGB">
            <feColorMatrix type="matrix" values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                2 2 2 0 0
            " />
        </filter>
    </svg>
`;
if (!html.includes('id="unblack"')) {
    html = html.replace('<body>', '<body>\n' + svgFilter);
}

// 2. Add global CSS to apply #unblack to all icons that currently use mix-blend-mode: screen
const cssOverride = `
        /* --- Universal Black Background Remover --- */
        img[style*="mix-blend-mode: screen"],
        .tab img,
        .position-circle img,
        .tier-item img,
        .title img,
        #modalOverallIcon {
            mix-blend-mode: normal !important;
            filter: url(#unblack) brightness(1.2) drop-shadow(0 2px 4px rgba(0,0,0,0.5)) !important;
            border-radius: 0 !important;
            background: transparent !important;
        }
`;
html = html.replace('</style>', cssOverride + '\n    </style>');

// 3. Add loading="lazy" to player avatars to prevent tab-switch stutter
html = html.replace(/<img src="\${avatarUrl}" class="avatar"/g, '<img src="${avatarUrl}" loading="lazy" class="avatar"');
html = html.replace(/<img src="\${bustUrl}" class="player-bust"/g, '<img src="${bustUrl}" loading="lazy" class="player-bust"');

// 4. Also add loading="lazy" to board player avatars
// In renderBoardView: <img src="${avatarUrl}" class="avatar"
// Already covered by regex above.

fs.writeFileSync('index.html', html);
console.log('Unblack filter and lazy loading applied successfully!');
