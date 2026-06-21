const fs = require('fs');
const file = 'C:\\Users\\user\\.gemini\\antigravity\\scratch\\accension-leaderboard\\index.html';
let content = fs.readFileSync(file, 'utf8');

// Replace POSITIONS with TIERS in the header
content = content.replace(
    '<span>POSITIONS</span>',
    '<span>TIERS</span>'
);

// Replace #1 #2 #3 #4 #5 with Tier 1 Tier 2 etc in columnsData
content = content.replace(
    '{ num: 1, title: "#1", iconSrc: IMG.tier1, class: "col-header-1" },',
    '{ num: 1, title: "Tier 1", iconSrc: IMG.tier1, class: "col-header-1" },'
);
content = content.replace(
    '{ num: 2, title: "#2", iconSrc: IMG.tier2, class: "col-header-2" },',
    '{ num: 2, title: "Tier 2", iconSrc: IMG.tier2, class: "col-header-2" },'
);
content = content.replace(
    '{ num: 3, title: "#3", iconSrc: IMG.tier3, class: "col-header-3" },',
    '{ num: 3, title: "Tier 3", iconSrc: IMG.tier3, class: "col-header-3" },'
);
content = content.replace(
    '{ num: 4, title: "#4", iconSrc: null, class: "col-header-4" },',
    '{ num: 4, title: "Tier 4", iconSrc: null, class: "col-header-4" },'
);
content = content.replace(
    '{ num: 5, title: "#5", iconSrc: null, class: "col-header-5" }',
    '{ num: 5, title: "Tier 5", iconSrc: null, class: "col-header-5" }'
);

fs.writeFileSync(file, content);
console.log("Successfully updated titles in index.html safely.");
