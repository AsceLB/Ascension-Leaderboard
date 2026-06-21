const fs = require('fs');

const file = 'C:\\Users\\user\\.gemini\\antigravity\\scratch\\accension-leaderboard\\index.html';
let content = fs.readFileSync(file, 'utf8');

const targetContent = `        // Tiers / Positions
        let activeTiersHTML = '';
        let retiredTiersHTML = '';
        categories.forEach(cat => {
            let val = player.stats[cat.id];
            if(val) {
                let isRetired = false;
                let numVal = val;
                
                if (typeof val === 'string' && val.toLowerCase().startsWith('r')) {
                    isRetired = true;
                    numVal = parseInt(val.substring(1));
                }

                let color = numVal === 1 ? '#dfa539' : numVal === 2 ? '#aabac6' : numVal === 3 ? '#be733f' : '#64748b';
                let bgAlpha = numVal === 1 ? 'linear-gradient(rgba(223, 165, 57, 0.15), rgba(223, 165, 57, 0.15)), var(--card-bg)' : numVal === 2 ? 'linear-gradient(rgba(170, 186, 198, 0.15), rgba(170, 186, 198, 0.15)), var(--card-bg)' : numVal === 3 ? 'linear-gradient(rgba(190, 115, 63, 0.15), rgba(190, 115, 63, 0.15)), var(--card-bg)' : 'linear-gradient(rgba(100, 116, 139, 0.15), rgba(100, 116, 139, 0.15)), var(--card-bg)';
                let borderAlpha = numVal === 1 ? 'rgba(223, 165, 57, 0.3)' : numVal === 2 ? 'rgba(170, 186, 198, 0.3)' : numVal === 3 ? 'rgba(190, 115, 63, 0.3)' : 'rgba(100, 116, 139, 0.3)';
                
                let actualBorderColor = isRetired ? '#64748b' : color;
                let actualBgAlpha = isRetired ? 'linear-gradient(rgba(100, 116, 139, 0.15), rgba(100, 116, 139, 0.15)), var(--card-bg)' : bgAlpha;
                let actualBorderAlpha = isRetired ? 'rgba(100, 116, 139, 0.3)' : borderAlpha;

                let label = isRetired ? \`R#\${numVal}\` : \`#\${numVal}\`;
                let fontStyle = isRetired ? 'font-style: italic;' : '';
                
                let peakRank = (player.peaks && player.peaks[cat.id]) ? player.peaks[cat.id] : null;
                let tooltipTitle = peakRank ? \`Peak #\${peakRank}\` : label;
                let tooltipPoints = peakRank ? (POSITION_POINTS[peakRank] || 0) : (POSITION_POINTS[numVal] || 0);
                let tooltipColor = peakRank === 1 ? '#dfa539' : peakRank === 2 ? '#aabac6' : peakRank === 3 ? '#be733f' : peakRank ? '#64748b' : color;
                
                let tierHTML = \`
                <div class="modal-tier-icon" onclick="goToBoard('\${cat.id}', '\${playerName}')">
                    <div class="modal-icon-wrapper" style="border: 1.5px solid \${actualBorderColor};">
                        <img src="\${cat.icon}" alt="\${cat.name}">
                    </div>
                    <span class="modal-tier-icon-value" style="color: \${color}; text-shadow: 0 0 5px \${color}; background: \${actualBgAlpha}; border: 1px solid \${actualBorderAlpha}; \${fontStyle}">\${label}</span>
                    <div class="tooltip-box">
                        <div class="tooltip-title" style="color: \${tooltipColor}; text-shadow: 0 0 5px \${tooltipColor};">\${tooltipTitle}</div>
                        <div class="tooltip-desc">\${tooltipPoints} points</div>
                    </div>
                </div>\`;`;

const replacementContent = `        // Tiers / Positions
        let activeTiersHTML = '';
        let retiredTiersHTML = '';
        categories.forEach(cat => {
            let val = player.stats[cat.id];
            let peakRank = (player.peaks && player.peaks[cat.id]) ? player.peaks[cat.id] : null;
            let displayVal = peakRank || val;
            
            if(displayVal) {
                let isRetired = false;
                let tierStr = String(displayVal).toUpperCase();
                
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
                
                let tooltipTitle = peakRank ? \`Peak: \${peakRank}\` : \`Tier: \${label}\`;
                let tooltipColor = color;
                
                let tierHTML = \`
                <div class="modal-tier-icon" onclick="goToBoard('\${cat.id}', '\${playerName}')">
                    <div class="modal-icon-wrapper" style="border: 1.5px solid \${actualBorderColor};">
                        <img src="\${cat.icon}" alt="\${cat.name}">
                    </div>
                    <span class="modal-tier-icon-value" style="color: \${color}; text-shadow: 0 0 5px \${color}; background: \${actualBgAlpha}; border: 1px solid \${actualBorderAlpha}; \${fontStyle}">\${label}</span>
                    <div class="tooltip-box">
                        <div class="tooltip-title" style="color: \${tooltipColor}; text-shadow: 0 0 5px \${tooltipColor};">\${tooltipTitle}</div>
                    </div>
                </div>\`;`;

if(content.includes(targetContent)) {
    content = content.replace(targetContent, replacementContent);
    fs.writeFileSync(file, content);
    console.log("Success");
} else {
    console.log("Target content not found");
}
