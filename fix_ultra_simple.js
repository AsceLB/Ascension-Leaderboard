const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Leaderboard Tier Icons HTML
html = html.replace(
    /<div class="tier-icon-container" style="position: relative; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; z-index: 1;">\s*<div class="tier-icon-border" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; border-radius: 50%; border: 1\.5px solid \$\{actualBorderColor\}; pointer-events: none; z-index: 2;"><\/div>\s*<img src="\$\{cat\.icon\}" alt="\$\{cat\.name\}" style="width: 30px; height: 30px; object-fit: contain; mix-blend-mode: screen !important; z-index: 3;">\s*<\/div>/g,
    `<div class="icon-wrapper" style="border: 1.5px solid \${actualBorderColor};">
                            <img src="\${cat.icon}" alt="\${cat.name}">
                        </div>`
);

// 2. Modal Tier Icons HTML
html = html.replace(
    /<div class="modal-tier-container" style="position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; z-index: 1;">\s*<div class="modal-tier-border" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; border-radius: 50%; border: 1\.5px solid \$\{actualBorderColor\}; pointer-events: none; z-index: 2;"><\/div>\s*<img src="\$\{cat\.icon\}" alt="\$\{cat\.name\}" style="width: 30px; height: 30px; object-fit: contain; mix-blend-mode: screen !important; z-index: 3;">\s*<\/div>/g,
    `<div class="modal-icon-wrapper" style="border: 1.5px solid \${actualBorderColor};">
                        <img src="\${cat.icon}" alt="\${cat.name}">
                    </div>`
);

// 3. Tabs HTML
html = html.replace(
    /tabsContainer\.innerHTML = `<div class="tab active" data-target="overall"><div class="tab-icon-blender"><img src="\$\{IMG\.overall\}" alt="Overall"><\/div> Overall<\/div>`;/g,
    `tabsContainer.innerHTML = \`<div class="tab active" data-target="overall"><img src="\${IMG.overall}" alt="Overall"> Overall</div>\`;`
);
html = html.replace(
    /tabsContainer\.innerHTML \+= `<div class="tab" data-target="\$\{cat\.id\}"><div class="tab-icon-blender"><img src="\$\{cat\.icon\}" alt="\$\{cat\.name\}"><\/div> \$\{cat\.name\}<\/div>`;/g,
    `tabsContainer.innerHTML += \`<div class="tab" data-target="\${cat.id}"><img src="\${cat.icon}" alt="\${cat.name}"> \${cat.name}</div>\`;`
);

// 4. Modal Overall Icon HTML
html = html.replace(
    /<div id="modalOverallBlender" style="width: 28px; height: 28px; margin-right: 10px; mix-blend-mode: screen !important;">\s*<img id="modalOverallIcon" src="" alt="Overall" style="width: 100%; height: 100%; object-fit: contain;">\s*<\/div>/g,
    `<img id="modalOverallIcon" src="" alt="Overall" style="width: 28px; height: 28px; margin-right: 10px; object-fit: contain;">`
);


// 5. CSS Reverts
// A. Tier Icons Hover
html = html.replace(
    /\.tier-item:hover \.tier-icon-container \{\s*transform: scale\(1\.15\);\s*\}/g,
    `.tier-item:hover .icon-wrapper {
            transform: scale(1.15);
        }`
);
html = html.replace(
    /\.tier-icon-container, \.tier-icon-value \{\s*transition: transform 0\.3s cubic-bezier\(0\.34, 1\.56, 0\.64, 1\);\s*\}/g,
    `.icon-wrapper, .tier-icon-value {
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }`
);

// B. Modal Tier Icons Hover
html = html.replace(
    /\.modal-tier-icon:hover \.modal-tier-container, \.modal-tier-icon:hover \.modal-tier-icon-value \{\s*transform: scale\(1\.15\);\s*\}/g,
    `.modal-tier-icon:hover .modal-icon-wrapper, .modal-tier-icon:hover .modal-tier-icon-value {
            transform: scale(1.15);
        }`
);
html = html.replace(
    /\.modal-tier-container, \.modal-tier-icon-value \{\s*transition: transform 0\.3s cubic-bezier\(0\.34, 1\.56, 0\.64, 1\);\s*\}/g,
    `.modal-icon-wrapper, .modal-tier-icon-value {
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }`
);

// C. Tabs Hover
html = html.replace(
    /\.tab\.active \.tab-icon-blender, \.tab:hover \.tab-icon-blender \{\s*opacity: 1;\s*\}/g,
    `.tab.active img, .tab:hover img {
            opacity: 1;
        }`
);
html = html.replace(
    /\.tab-icon-blender \{\s*width: 18px;\s*height: 18px;\s*opacity: 0\.5;\s*transition: all 0\.3s ease;\s*mix-blend-mode: screen !important;\s*display: flex;\s*align-items: center;\s*justify-content: center;\s*\}\s*\.tab-icon-blender img \{\s*width: 100%;\s*height: 100%;\s*object-fit: contain;\s*\}/g,
    `.tab img {
            width: 18px;
            height: 18px;
            object-fit: contain;
            opacity: 0.5;
            transition: all 0.3s ease;
        }`
);

// 6. Inject .icon-wrapper and .modal-icon-wrapper CSS right before the final filter block
html = html.replace(
    /img\[style\*="mix-blend-mode: screen"\],\s*\.title img,/g,
    `.icon-wrapper {
            width: 38px;
            height: 38px;
            padding: 4px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
        }
        .icon-wrapper img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
        .modal-icon-wrapper {
            width: 44px;
            height: 44px;
            padding: 7px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
        }
        .modal-icon-wrapper img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        /* --- PNG and JPG Background Remover & Enhancer --- */
        img[style*="mix-blend-mode: screen"],
        .title img,`
);

// 7. Update Filter Block
html = html.replace(
    /img\[style\*="mix-blend-mode: screen"\],\s*\.title img,\s*\.tab-icon-blender img,\s*\.position-circle img,\s*#modalOverallIcon \{\s*mix-blend-mode: screen !important;\s*filter: contrast\(4\) brightness\(0\.7\) saturate\(1\.2\) !important;\s*background: transparent !important;\s*\}/g,
    `img[style*="mix-blend-mode: screen"],
        .title img,
        .tab img,
        .position-circle img,
        .icon-wrapper img,
        .modal-icon-wrapper img,
        #modalOverallIcon {
            mix-blend-mode: screen !important;
            filter: contrast(4) brightness(0.7) saturate(1.2) !important;
            background: transparent !important;
        }`
);


fs.writeFileSync('index.html', html);
console.log('Regex update finished.');
