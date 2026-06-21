const fs = require('fs');
const file = 'C:\\Users\\user\\.gemini\\antigravity\\scratch\\accension-leaderboard\\index.html';
let content = fs.readFileSync(file, 'utf8');

// Update POSITION_POINTS
content = content.replace(
    'const POSITION_POINTS = { 1: 10, 2: 7, 3: 5, 4: 3, 5: 1 };',
    "const POSITION_POINTS = { 1: 10, 2: 7, 3: 5, 4: 3, 5: 1, 'HT1': 15, 'LT1': 12, 'HT2': 10, 'LT2': 8, 'HT3': 6, 'LT3': 4, 'HT4': 3, 'LT4': 2, 'HT5': 1, 'LT5': 0 };"
);

// Update Modal Tiers Rendering
const targetBlockStart = `                if (typeof val === 'string' && val.toLowerCase().startsWith('r')) {`;
const targetBlockEnd = `                let tooltipColor = peakRank === 1 ? '#dfa539' : peakRank === 2 ? '#aabac6' : peakRank === 3 ? '#be733f' : peakRank ? '#64748b' : color;`;

const originalBlock = content.substring(
    content.indexOf(targetBlockStart),
    content.indexOf(targetBlockEnd) + targetBlockEnd.length
);

const newBlock = `                let tierStr = String(val).toUpperCase();
                
                if (tierStr.startsWith('R') && tierStr.length > 2) {
                    isRetired = true;
                    tierStr = tierStr.substring(1);
                }

                let color = '#64748b'; 
                if (tierStr.includes('HT1') || tierStr === '1') color = '#dfa539';
                else if (tierStr.includes('LT1')) color = '#a79759';
                else if (tierStr.includes('HT2') || tierStr === '2') color = '#aabac6';
                else if (tierStr.includes('LT2')) color = '#6a8ca7';
                else if (tierStr.includes('HT3') || tierStr === '3') color = '#be733f';
                else if (tierStr.includes('LT3')) color = '#9f5f3a';
                else if (tierStr.includes('HT4')) color = '#a855f7';
                else if (tierStr.includes('LT4')) color = '#7e22ce';
                else if (tierStr.includes('HT5')) color = '#ef4444';
                else if (tierStr.includes('LT5')) color = '#b91c1c';

                const hexToRgb = hex => {
                    let result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
                    return result ? \`\${parseInt(result[1], 16)}, \${parseInt(result[2], 16)}, \${parseInt(result[3], 16)}\` : '100, 116, 139';
                };
                const rgbColor = hexToRgb(color);
                
                let bgAlpha = \`linear-gradient(rgba(\${rgbColor}, 0.15), rgba(\${rgbColor}, 0.15)), var(--card-bg)\`;
                let borderAlpha = \`rgba(\${rgbColor}, 0.3)\`;
                
                let actualBorderColor = isRetired ? '#64748b' : color;
                let actualBgAlpha = isRetired ? 'linear-gradient(rgba(100, 116, 139, 0.15), rgba(100, 116, 139, 0.15)), var(--card-bg)' : bgAlpha;
                let actualBorderAlpha = isRetired ? 'rgba(100, 116, 139, 0.3)' : borderAlpha;

                let label = isRetired ? \`R-\${tierStr}\` : tierStr;
                if (!isNaN(parseInt(tierStr)) && !tierStr.includes('T')) label = isRetired ? \`R#\${tierStr}\` : \`#\${tierStr}\`;

                let fontStyle = isRetired ? 'font-style: italic;' : '';
                
                let peakRank = (player.peaks && player.peaks[cat.id]) ? player.peaks[cat.id] : null;
                let tooltipTitle = peakRank ? \`Peak: \${peakRank}\` : \`Tier: \${label}\`;
                let tooltipPoints = peakRank ? (POSITION_POINTS[peakRank] || 0) : (POSITION_POINTS[tierStr] || 0);
                let tooltipColor = color;`;

if (content.includes(originalBlock)) {
    content = content.replace(originalBlock, newBlock);
    fs.writeFileSync(file, content);
    console.log("Successfully updated index.html");
} else {
    console.log("Could not find the target block in index.html");
}
