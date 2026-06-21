const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove Zen Toggle
html = html.replace(
    /<!-- Zen Mode Toggle \(Hide UI\) -->[\s\S]*?<button id="zenToggle".*?>[\s\S]*?<\/button>/,
    ''
);
// Also remove JS logic for Zen Mode
html = html.replace(
    /\/\* --- Zen Mode Toggle ---\*\/[\s\S]*?const zenToggle = document\.getElementById\('zenToggle'\);[\s\S]*?\}\);/g,
    ''
);


// 2. Fix Leaderboard Tier Icons Architecture (Siblings instead of wrapper)
html = html.replace(
    /<div class="icon-wrapper" style="border: 1\.5px solid \$\{actualBorderColor\};">\s*<div class="icon-blender">\s*<img src="\$\{cat\.icon\}" alt="\$\{cat\.name\}">\s*<\/div>\s*<\/div>/g,
    `<div class="tier-icon-container" style="position: relative; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; z-index: 1;">
                            <div class="tier-icon-border" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; border-radius: 50%; border: 1.5px solid \${actualBorderColor}; pointer-events: none; z-index: 2;"></div>
                            <img src="\${cat.icon}" alt="\${cat.name}" style="width: 30px; height: 30px; object-fit: contain; mix-blend-mode: screen !important; z-index: 3;">
                        </div>`
);

// 3. Fix Modal Tier Icons Architecture (Siblings)
html = html.replace(
    /<div class="modal-tier-wrapper" style="border: 1\.5px solid \$\{actualBorderColor\};">\s*<img src="\$\{cat\.icon\}" alt="\$\{cat\.name\}">\s*<\/div>/g,
    `<div class="modal-tier-container" style="position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; z-index: 1;">
                        <div class="modal-tier-border" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; border-radius: 50%; border: 1.5px solid \${actualBorderColor}; pointer-events: none; z-index: 2;"></div>
                        <img src="\${cat.icon}" alt="\${cat.name}" style="width: 30px; height: 30px; object-fit: contain; mix-blend-mode: screen !important; z-index: 3;">
                    </div>`
);

// 4. Clean up CSS that we don't need anymore
html = html.replace(
    /\.tier-item:hover \.icon-wrapper \{\s*transform: scale\(1\.15\);\s*\}/g,
    `.tier-item:hover .tier-icon-container {
            transform: scale(1.15);
        }`
);

html = html.replace(
    /\.icon-wrapper, \.tier-icon-value/g,
    `.tier-icon-container, .tier-icon-value`
);

// Remove .icon-wrapper and .icon-blender and .modal-tier-wrapper CSS blocks
html = html.replace(/\.icon-wrapper \{[\s\S]*?\}\s*\.icon-blender \{[\s\S]*?\}\s*\.icon-blender img \{[\s\S]*?\}/g, '');
html = html.replace(/\.modal-tier-wrapper \{[\s\S]*?\}\s*\.modal-tier-icon img \{[\s\S]*?\}/g, '');

// Since I removed `.icon-blender img` and `.modal-tier-icon img`, I need to fix the filter block
html = html.replace(
    /img\[style\*="mix-blend-mode: screen"\],\s*\.title img,\s*\.tab-icon-blender img,\s*\.position-circle img,\s*\.icon-blender img,\s*#modalOverallIcon,\s*\.modal-tier-icon img/g,
    `img[style*="mix-blend-mode: screen"],
        .title img,
        .tab-icon-blender img,
        .position-circle img,
        #modalOverallIcon`
);

// 5. One last detail: hover effect for modal-tier-icon
html = html.replace(
    /\.modal-tier-icon:hover img,\s*\.modal-tier-icon:hover \.modal-tier-icon-value \{\s*transform: scale\(1\.15\);\s*\}/g,
    `.modal-tier-icon:hover .modal-tier-container, .modal-tier-icon:hover .modal-tier-icon-value {
            transform: scale(1.15);
        }`
);
html = html.replace(
    /\.modal-tier-icon img, \.modal-tier-icon-value \{\s*transition: transform 0\.3s cubic-bezier\(0\.34, 1\.56, 0\.64, 1\);\s*\}/g,
    `.modal-tier-container, .modal-tier-icon-value {
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }`
);

fs.writeFileSync('index.html', html);
console.log('Regex update finished.');
