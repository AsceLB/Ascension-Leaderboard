const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// ============================================================================
// FIX 1: Replace SVG filter with proper chroma-key that makes dark pixels
//         TRANSPARENT (alpha=0) instead of trying to use mix-blend-mode
// ============================================================================
html = html.replace(
    /<svg width="0" height="0" style="position: absolute; pointer-events: none;">\s*<filter id="remove-img-bg"[^>]*>\s*<feColorMatrix[^/]*\/>\s*<\/filter>\s*<\/svg>/,
    `<svg width="0" height="0" style="position: absolute; pointer-events: none;">
        <filter id="remove-img-bg" color-interpolation-filters="sRGB">
            <!-- Compute brightness as alpha: alpha = 0.333*R + 0.333*G + 0.333*B -->
            <feColorMatrix type="matrix" values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0.333 0.333 0.333 0 0
            " result="withAlpha"/>
            <!-- Threshold alpha: dark pixels (brightness < 12%) become fully transparent -->
            <feComponentTransfer in="withAlpha">
                <feFuncR type="identity"/>
                <feFuncG type="identity"/>
                <feFuncB type="identity"/>
                <feFuncA type="table" tableValues="0 0 1 1 1 1 1 1 1 1"/>
            </feComponentTransfer>
        </filter>
    </svg>`
);

// Also handle the old format if it exists
html = html.replace(
    /<svg width="0" height="0" style="position: absolute; pointer-events: none;">\s*<filter id="remove-img-bg"[^>]*>\s*<feComponentTransfer>\s*<feFuncR[^/]*\/>\s*<feFuncG[^/]*\/>\s*<feFuncB[^/]*\/>\s*<feFuncA[^/]*\/>\s*<\/feComponentTransfer>\s*<\/filter>\s*<\/svg>/,
    `<svg width="0" height="0" style="position: absolute; pointer-events: none;">
        <filter id="remove-img-bg" color-interpolation-filters="sRGB">
            <feColorMatrix type="matrix" values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0.333 0.333 0.333 0 0
            " result="withAlpha"/>
            <feComponentTransfer in="withAlpha">
                <feFuncR type="identity"/>
                <feFuncG type="identity"/>
                <feFuncB type="identity"/>
                <feFuncA type="table" tableValues="0 0 1 1 1 1 1 1 1 1"/>
            </feComponentTransfer>
        </filter>
    </svg>`
);

// ============================================================================
// FIX 2: Replace the ENTIRE CSS filter section with a clean version
//         that uses ONLY the SVG filter and NO mix-blend-mode at all
// ============================================================================

// Remove the old "PNG Background Remover" block
html = html.replace(
    /\/\* --- PNG Background Remover \(Screen Additive\) ---\*\/\s*img\[style\*="mix-blend-mode: screen"\],\s*\.title img \{\s*mix-blend-mode: screen !important;\s*background: transparent !important;\s*\}/,
    `/* --- Icon Background Remover (SVG Chroma-Key Filter) ---*/
        /* Uses SVG filter to make dark pixels transparent. No mix-blend-mode needed! */`
);

// Remove the old "JPG Background Remover" comment
html = html.replace(
    /\/\* --- JPG Background Remover \(Screen with high contrast to crush background to pure black\) ---\*\//,
    ''
);

// Add filter to .icon-wrapper img
html = html.replace(
    /\.icon-wrapper img \{\s*width: 100%;\s*height: 100%;\s*object-fit: contain;\s*\}/,
    `.icon-wrapper img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            filter: url(#remove-img-bg);
        }`
);

// Add filter to .modal-icon-wrapper img
html = html.replace(
    /\.modal-icon-wrapper img \{\s*width: 100%;\s*height: 100%;\s*object-fit: contain;\s*\}/,
    `.modal-icon-wrapper img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            filter: url(#remove-img-bg);
        }`
);

// Replace the entire "PNG and JPG Background Remover & Enhancer" block
// with a simple SVG filter rule (no mix-blend-mode)
html = html.replace(
    /\/\* --- PNG and JPG Background Remover & Enhancer ---\*\/\s*\/\* Apply SVG filter[^*]*\*\/\s*img\[style\*="mix-blend-mode: screen"\],\s*\.title img,\s*\.tab img,\s*\.position-circle img,\s*\.icon-wrapper img,\s*\.modal-icon-wrapper img,\s*#modalOverallIcon \{\s*filter: url\(#remove-img-bg\) !important;\s*background: transparent !important;\s*\}\s*\/\* Apply mix-blend-mode directly[^*]*\*\/\s*img\[style\*="mix-blend-mode: screen"\],\s*\.title img,\s*\.tab img,\s*\.position-circle img,\s*#modalOverallIcon \{\s*mix-blend-mode: screen !important;\s*\}\s*\/\* CRITICAL CHROMIUM BUG FIX[^*]*\*\/\s*\.icon-wrapper,\s*\.modal-icon-wrapper \{\s*mix-blend-mode: screen !important;\s*background: transparent !important;\s*\}/,
    `/* Apply chroma-key filter to all other icon images site-wide */
        .tab img,
        .title img,
        #modalOverallIcon,
        img[style*="mix-blend-mode: screen"] {
            filter: url(#remove-img-bg) !important;
            background: transparent !important;
        }`
);

fs.writeFileSync('index.html', html);

// Verify no mix-blend-mode: screen remains in CSS (only in inline styles which is fine)
const remaining = html.match(/mix-blend-mode:\s*screen/g);
console.log('Remaining mix-blend-mode: screen occurrences:', remaining ? remaining.length : 0);
console.log('(Note: some in inline styles for rank info modal icons are expected)');
console.log('Fix complete!');
